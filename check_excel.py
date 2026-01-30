import pandas as pd

# 检查Excel文件的结构
def check_excel_structure(file_path):
    try:
        print(f"检查文件: {file_path}")
        
        # 根据文件扩展名选择读取方法
        if file_path.endswith('.xlsx'):
            df = pd.read_excel(file_path)
        elif file_path.endswith('.xls'):
            df = pd.read_excel(file_path, engine='xlrd')
        else:
            print(f"不支持的文件格式: {file_path}")
            return
        
        # 打印列名
        print(f"列名: {list(df.columns)}")
        
        # 打印前5行数据
        print("\n前5行数据:")
        print(df.head())
        
        # 打印数据类型
        print("\n数据类型:")
        print(df.dtypes)
        
        print("\n" + "-" * 50 + "\n")
        
    except Exception as e:
        print(f"检查文件时出错: {e}")

# 主函数
def main():
    # 检查两个Excel文件
    file1 = '/Users/Anyuu/Projects/valusis/A股列表.xlsx'
    file2 = '/Users/Anyuu/Projects/valusis/GPLIST.xls'
    
    check_excel_structure(file1)
    check_excel_structure(file2)

if __name__ == "__main__":
    main()