import pandas as pd
import json
import os

# http://www.szse.cn/market/product/stock/list/index.html
# https://www.sse.com.cn/assortment/stock/list/share/
# 读取Excel文件
def read_excel_file(file_path):
    try:
        # 根据文件扩展名选择读取方法
        if file_path.endswith('.xlsx'):
            df = pd.read_excel(file_path)
        elif file_path.endswith('.xls'):
            df = pd.read_excel(file_path, engine='xlrd')
        else:
            print(f"不支持的文件格式: {file_path}")
            return []
        
        # 提取股票代码和名称
        stocks = []
        for index, row in df.iterrows():
            # 根据实际的列名提取数据
            if 'A股代码' in row:
                if 'A股简称' in row:
                    code = str(row['A股代码']).strip()
                    name = str(row['A股简称']).strip()
                elif '证券简称' in row:
                    code = str(row['A股代码']).strip()
                    name = str(row['证券简称']).strip()
                else:
                    continue
            elif '代码' in row and '名称' in row:
                code = str(row['代码']).strip()
                name = str(row['名称']).strip()
            elif 'stock_code' in row and 'stock_name' in row:
                code = str(row['stock_code']).strip()
                name = str(row['stock_name']).strip()
            elif 'code' in row and 'name' in row:
                code = str(row['code']).strip()
                name = str(row['name']).strip()
            else:
                continue
            
            # 过滤无效数据
            if code and name and code != 'nan' and name != 'nan' and name != '-' and name.strip():
                # 确保股票代码是6位数字
                code = code.zfill(6)
                stocks.append({"code": code, "name": name})
        
        return stocks
    except Exception as e:
        print(f"读取文件时出错: {e}")
        return []

# 主函数
def main():
    # 读取两个Excel文件
    file1 = '/Users/Anyuu/Projects/valusis/A股列表.xlsx'
    file2 = '/Users/Anyuu/Projects/valusis/GPLIST.xls'
    
    stocks1 = read_excel_file(file1)
    stocks2 = read_excel_file(file2)
    
    # 合并所有股票数据并去重
    all_stocks = stocks1 + stocks2
    
    # 去重，基于股票代码
    unique_stocks = []
    seen_codes = set()
    for stock in all_stocks:
        if stock['code'] not in seen_codes:
            seen_codes.add(stock['code'])
            unique_stocks.append(stock)
    
    # 按股票代码排序
    unique_stocks.sort(key=lambda x: x['code'])
    
    # 写入stocks.json文件
    output_file = '/Users/Anyuu/Projects/valusis/stocks.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(unique_stocks, f, ensure_ascii=False, indent=4)
    
    print(f"已成功生成stocks.json文件")
    print(f"总股票数量: {len(unique_stocks)}")
    print(f"来自A股列表.xlsx的股票数量: {len(stocks1)}")
    print(f"来自GPLIST.xls的股票数量: {len(stocks2)}")

if __name__ == "__main__":
    main()