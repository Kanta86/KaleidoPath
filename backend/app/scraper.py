import asyncio
import json
import re
from typing import List, Optional
from playwright.async_api import async_playwright, Page
from bs4 import BeautifulSoup
from .models import Product, ScentNotes

class BrandScraper:
    def __init__(self):
        self.semaphore = asyncio.Semaphore(2)

    async def collect(self, brand: str, update_progress_callback) -> List[Product]:
        products = []
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                # Use a realistic User Agent
                context = await browser.new_context(
                    user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                )
                
                await update_progress_callback("searching", 0, 0)
                
                # 1. Search for Brand URL via Google
                page = await context.new_page()
                search_query = f"{brand} リードディフューザー 公式"
                await page.goto(f"https://www.google.com/search?q={search_query}&hl=ja")
                await page.wait_for_timeout(2000) # Wait for human-like behavior
                
                # Get the first organic result
                # Standard Google result selector (might change, but usually h3 is inside 'a')
                # Try to find the first 'a' inside standard result container (g class or similar)
                links = await page.locator("#search a").all()
                target_url = None
                for link in links:
                    href = await link.get_attribute("href")
                    if href and href.startswith("http") and "google" not in href:
                        target_url = href
                        break
                
                if not target_url:
                    print(f"Could not find URL for {brand}")
                    await browser.close()
                    return []
                
                print(f"Found target URL: {target_url}")
                await update_progress_callback("scraping_list", 0, 0)
                
                # 2. Visit the target URL
                await page.goto(target_url)
                await page.wait_for_timeout(2000)
                
                # 3. Discover Product Links
                # Heuristic: Find all links that look like products. 
                # Or just grab all links and filter by duplicate titles or specific patterns?
                # A better heuristic for a generic scraper is hard.
                # Let's try to grab all <a> tags, filter unique URLs that are within the same domain.
                
                all_links = await page.locator("a").all()
                product_candidates = set()
                base_domain = "/".join(target_url.split("/")[:3])
                
                for link in all_links:
                    href = await link.get_attribute("href")
                    if not href: continue
                    
                    # Normalize URL
                    if href.startswith("/"):
                        href = base_domain + href
                    elif not href.startswith("http"):
                        continue
                        
                    # Filter internal links only
                    if base_domain not in href:
                         continue
                         
                    # Heuristic: exclude cart, login, account, help, etc.
                    if any(x in href.lower() for x in ["login", "cart", "account", "help", "contact", "about", "news", "blog", "instagram", "facebook", "twitter"]):
                        continue
                        
                    product_candidates.add(href)
                
                # Limit candidates to avoid crawling the whole site (e.g. max 20 for MVP)
                # Ideally we want to find the "list" page. 
                # If the current page has many internal links, assume it's a list page.
                
                # Just pick first 10-15 random links? No, that's bad.
                # Let's count occurrences or patterns?
                # We will just try to visit the first 10 unique product-looking links.
                # (Ideally, we should score them).
                
                # For MVP, cap at 10
                candidates_list = list(product_candidates)[:10]
                total_candidates = len(candidates_list)
                
                await update_progress_callback("scraping_details", 0, total_candidates)
                
                for i, url in enumerate(candidates_list):
                    try:
                        p_data = await self.parse_product_page(context, url)
                        if p_data:
                            # Check if it actually looks like a reed diffuser or fragrance
                            if brand in p_data.brand or "diffuser" in p_data.product_name.lower() or "fragrance" in p_data.product_name.lower():
                                products.append(p_data)
                    except Exception as e:
                        print(f"Error parsing {url}: {e}")
                    
                    await update_progress_callback("scraping_details", len(products), total_candidates)
                
                await update_progress_callback("done", len(products), total_candidates)
                await browser.close()
                
        except Exception as e:
            print(f"Error scraping {brand}: {e}")
            raise e
            
        return products

    async def parse_product_page(self, context, url: str) -> Optional[Product]:
        page = await context.new_page()
        try:
            await page.goto(url, timeout=30000)
            # await page.wait_for_load_state("networkidle") # sometimes too slow
            
            content = await page.content()
            soup = BeautifulSoup(content, "lxml")
            
            # 1. Try JSON-LD
            scripts = soup.find_all("script", type="application/ld+json")
            data = {}
            for script in scripts:
                try:
                    js = json.loads(script.string)
                    if isinstance(js, list):
                        js = js[0] # Take first if list
                    
                    if js.get("@type") == "Product":
                        data = js
                        break
                except:
                    continue
            
            title = ""
            if data:
                title = data.get("name", "")
                brand = data.get("brand", {}).get("name") if isinstance(data.get("brand"), dict) else data.get("brand", "")
                image = data.get("image")
                if isinstance(image, list): image = image[0]
                elif isinstance(image, dict): image = image.get("url")
                description = data.get("description", "")
                
                offers = data.get("offers", {})
                price = offers.get("price")
                if isinstance(offers, list) and offers:
                    price = offers[0].get("price")
            else:
                # Fallback to Meta Tags
                title = soup.find("meta", property="og:title")
                title = title["content"] if title else soup.title.string if soup.title else ""
                
                image = soup.find("meta", property="og:image")
                image = image["content"] if image else ""
                
                description = soup.find("meta", property="og:description")
                description = description["content"] if description else ""
                
                brand = "" # difficult to extract generic brand
                price = None

            # 2. Extract Description Text for Notes
            # Combine all P tags or just description
            desc_text = description
            if not desc_text:
                desc_text = soup.get_text()
            
            notes = self.extract_notes(desc_text)
            
            if not title:
                return None
                
            # If brand is missing, try to infer or leave empty? 
            # We can pass brand from the caller context if we want, but for now let's leave it.
            
            return Product(
                brand=str(brand) if brand else "",
                product_name=str(title).strip(),
                scent_name="", # Hard to separate from title usually
                notes=notes,
                volume_ml=self.extract_volume(title + " " + str(desc_text)),
                duration=None, # Hard to parse
                range=None,
                container_size=None,
                stick_length_cm=None,
                stick_count=None,
                price_jpy_tax_included=int(price) if price else None,
                features=None,
                description=str(description)[:200] + "..." if description else "",
                image_url=str(image) if image else None,
                product_url=url
            )
            
        finally:
            await page.close()

    def extract_notes(self, text: str) -> ScentNotes:
        notes = ScentNotes()
        # Simple regex for Top/Middle/Base
        # "Top: xxx, yyy"
        # "Middle: zzz"
        # "Base: aaa"
        
        # Normalize text
        text = text.replace("トップノート", "Top").replace("ミドルノート", "Middle").replace("ラストノート", "Base").replace("ボトムノート", "Base")
        
        # Regex patterns
        top_match = re.search(r"Top[:：](.+?)(?:Middle|Base|$)", text, re.IGNORECASE | re.DOTALL)
        if top_match:
            notes.top = [x.strip() for x in top_match.group(1).split(",")]
            
        mid_match = re.search(r"Middle[:：](.+?)(?:Base|$)", text, re.IGNORECASE | re.DOTALL)
        if mid_match:
            notes.middle = [x.strip() for x in mid_match.group(1).split(",")]
            
        base_match = re.search(r"Base[:：](.+?)(?:$)", text, re.IGNORECASE | re.DOTALL)
        if base_match:
            notes.bottom = [x.strip() for x in base_match.group(1).split(",")]
            
        return notes

    def extract_volume(self, text: str) -> Optional[float]:
        # Look for "xxx ml" or "xxxml"
        match = re.search(r"(\d+)\s?ml", text, re.IGNORECASE)
        if match:
            return float(match.group(1))
        return None

scraper = BrandScraper()
