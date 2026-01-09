import pandas as pd
from typing import List, Dict, Any
from .models import Product
import io

def create_excel(products: List[Product]) -> bytes:
    data = []
    for p in products:
        item = {
            "ブランド名": p.brand,
            "商品名": p.product_name,
            "香りの名前": p.scent_name,
            "トップノート": ", ".join(p.notes.top),
            "ミドルノート": ", ".join(p.notes.middle),
            "ボトムノート": ", ".join(p.notes.bottom),
            "容量(ml)": p.volume_ml,
            "想定持続時間": p.duration,
            "香る範囲(目安)": p.range,
            "容器サイズ": p.container_size,
            "スティック長さ(cm)": p.stick_length_cm,
            "スティック本数": p.stick_count,
            "価格(円・税込)": p.price_jpy_tax_included,
            "特徴": p.features,
            "商品説明": p.description,
            "商品画像(URL)": p.image_url,
            "商品リンク(URL)": p.product_url,
        }
        data.append(item)

    df = pd.DataFrame(data)
    
    # Define column order as requested
    columns = [
        "ブランド名", "商品名", "香りの名前", "トップノート", "ミドルノート", "ボトムノート",
        "容量(ml)", "想定持続時間", "香る範囲(目安)", "容器サイズ", "スティック長さ(cm)",
        "スティック本数", "価格(円・税込)", "特徴", "商品説明", "商品画像(URL)", "商品リンク(URL)"
    ]
    
    # Ensure all columns exist, fill with empty if missing
    for col in columns:
        if col not in df.columns:
            df[col] = ""
            
    # Reorder columns
    df = df[columns]
    
    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Products')
        
    return output.getvalue()
