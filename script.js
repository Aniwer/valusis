document.getElementById('valuation-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const getFloatValue = (id) => parseFloat(document.getElementById(id).value) || 0;
    const steps = [];

    let reproductionValue = 0;

    const cash = getFloatValue('cash');
    reproductionValue += cash;
    steps.push({ description: '现金', value: cash, total: reproductionValue });

    const accountsReceivable = getFloatValue('accounts-receivable');
    const creditLossRate = getFloatValue('credit-loss-rate') / 100;
    const accountsReceivableNet = accountsReceivable * (1 - creditLossRate);
    reproductionValue += accountsReceivableNet;
    steps.push({ description: `应收账款 (扣除${(creditLossRate * 100).toFixed(2)}%信用损失)`, value: accountsReceivableNet, total: reproductionValue });

    const notesReceivable = getFloatValue('notes-receivable');
    reproductionValue += notesReceivable;
    steps.push({ description: '减值后的应收票据', value: notesReceivable, total: reproductionValue });

    const inventory = getFloatValue('inventory');
    reproductionValue += inventory;
    steps.push({ description: '计提损失后的存货价值', value: inventory, total: reproductionValue });

    const tradingFinancialAssets = getFloatValue('trading-financial-assets');
    reproductionValue += tradingFinancialAssets;
    steps.push({ description: '交易性金融资产的当前价值', value: tradingFinancialAssets, total: reproductionValue });

    const otherCurrentAssets = getFloatValue('other-current-assets');
    reproductionValue += otherCurrentAssets;
    steps.push({ description: '其他流动资产', value: otherCurrentAssets, total: reproductionValue });

    const nonCurrentAssetsDue = getFloatValue('non-current-assets-due-within-one-year');
    reproductionValue += nonCurrentAssetsDue;
    steps.push({ description: '一年内到期的非流动资产', value: nonCurrentAssetsDue, total: reproductionValue });

    const plantDepreciation = getFloatValue('plant-depreciation-coefficient');
    reproductionValue += plantDepreciation;
    steps.push({ description: '厂房/折旧系数', value: plantDepreciation, total: reproductionValue });

    const machineryDepreciation = getFloatValue('machinery-depreciation-coefficient');
    reproductionValue += machineryDepreciation;
    steps.push({ description: '生产机器设备/折旧系数', value: machineryDepreciation, total: reproductionValue });

    const constructionInProgress = getFloatValue('construction-in-progress');
    reproductionValue += constructionInProgress;
    steps.push({ description: '在建工程账面价值', value: constructionInProgress, total: reproductionValue });

    const landBookValue = getFloatValue('land-book-value');
    const landValueCoefficient = getFloatValue('land-value-coefficient');
    const landValue = landBookValue * landValueCoefficient;
    reproductionValue += landValue;
    steps.push({ description: `土地账面价值 (×${landValueCoefficient}还原系数)`, value: landValue, total: reproductionValue });

    const goodwill = getFloatValue('goodwill');
    reproductionValue += goodwill;
    steps.push({ description: '商誉', value: goodwill, total: reproductionValue });

    const companyType = document.getElementById('company-type').value;
    if (companyType === 'cyclical-resource') {
        const patentTechnologyValueCyclical = getFloatValue('patent-technology-value-cyclical');
        reproductionValue += patentTechnologyValueCyclical;
        steps.push({ description: '专利技术价值', value: patentTechnologyValueCyclical, total: reproductionValue });

        const mineralRightsValue = getFloatValue('mineral-rights-value');
        reproductionValue += mineralRightsValue;
        steps.push({ description: '矿产权益价值', value: mineralRightsValue, total: reproductionValue });
    } else if (companyType === 'consumer') {
        const patentTechnologyValueConsumer = getFloatValue('patent-technology-value-consumer');
        reproductionValue += patentTechnologyValueConsumer;
        steps.push({ description: '专利技术价值', value: patentTechnologyValueConsumer, total: reproductionValue });

        const productPortfolioValue = getFloatValue('product-portfolio-value');
        reproductionValue += productPortfolioValue;
        steps.push({ description: '产品组合价值', value: productPortfolioValue, total: reproductionValue });

        const trainedStaffValue = getFloatValue('trained-staff-value');
        reproductionValue += trainedStaffValue;
        steps.push({ description: '训练有素的员工价值', value: trainedStaffValue, total: reproductionValue });

        const customerRelationshipValue = getFloatValue('customer-relationship-value');
        reproductionValue += customerRelationshipValue;
        steps.push({ description: '客户关系价值', value: customerRelationshipValue, total: reproductionValue });
    }

    const debt = getFloatValue('debt');
    reproductionValue -= debt;
    steps.push({ description: '减去债务', value: -debt, total: reproductionValue });

    const reasonablePrice = reproductionValue * 0.7;
    steps.push({ description: '合理买入价格 (再生产价值 × 70%)', value: reasonablePrice, total: reasonablePrice });

    document.getElementById('reproduction-value').textContent = reproductionValue.toFixed(2);
    document.getElementById('reasonable-price').textContent = reasonablePrice.toFixed(2);

    const calculationStepsDiv = document.getElementById('calculation-steps');
    calculationStepsDiv.innerHTML = steps.map((step, index) => `
        <div class="calculation-step">
            <span class="step-number">${index + 1}.</span>
            <span class="step-description">${step.description}</span>
            <span class="step-value">${step.value >= 0 ? '+' : ''}${step.value.toFixed(2)}</span>
            <span class="step-total">= ${step.total.toFixed(2)}</span>
        </div>
    `).join('');
});

document.getElementById('company-type').addEventListener('change', function() {
    const companyType = this.value;
    const cyclicalFields = document.getElementById('cyclical-resource-fields');
    const consumerFields = document.getElementById('consumer-fields');

    if (companyType === 'cyclical-resource') {
        cyclicalFields.style.display = 'block';
        consumerFields.style.display = 'none';
    } else if (companyType === 'consumer') {
        cyclicalFields.style.display = 'none';
        consumerFields.style.display = 'block';
    } else { // real-estate
        cyclicalFields.style.display = 'none';
        consumerFields.style.display = 'none';
    }
});

function fillTianqiLithiumData() {
    document.getElementById('cash').value = 65.27;
    document.getElementById('accounts-receivable').value = 5.45;
    document.getElementById('credit-loss-rate').value = 0;
    document.getElementById('notes-receivable').value = 3.29;
    document.getElementById('inventory').value = 26.44;
    document.getElementById('trading-financial-assets').value = 15.26;
    document.getElementById('other-current-assets').value = 0;
    document.getElementById('non-current-assets-due-within-one-year').value = 0;
    document.getElementById('plant-depreciation-coefficient').value = 0;
    document.getElementById('machinery-depreciation-coefficient').value = 0;
    document.getElementById('construction-in-progress').value = 80.36;
    document.getElementById('land-book-value').value = 0;
    document.getElementById('land-value-coefficient').value = 0;
    document.getElementById('goodwill').value = 0;
    document.getElementById('company-type').value = 'cyclical-resource';
    document.getElementById('patent-technology-value-cyclical').value = 0;
    document.getElementById('mineral-rights-value').value = 0;
    document.getElementById('debt').value = 225.57;

    document.getElementById('company-type').dispatchEvent(new Event('change'));
}

let stockDatabase = [];

// 加载股票数据
async function loadStockData() {
    try {
        const response = await fetch('stocks.json');
        if (!response.ok) {
            throw new Error('Failed to load stock data');
        }
        const data = await response.json();
        stockDatabase = data;
        console.log('股票数据加载成功，共', stockDatabase.length, '只股票');
    } catch (error) {
        console.error('加载股票数据失败:', error);
        // 使用默认股票数据作为备用
        stockDatabase = [
            { code: '000001', name: '平安银行' },
            { code: '000002', name: '万科A' },
            { code: '000063', name: '中兴通讯' },
            { code: '000333', name: '美的集团' },
            { code: '000651', name: '格力电器' },
            { code: '000725', name: '京东方A' },
            { code: '000858', name: '五粮液' },
            { code: '000876', name: '新希望' },
            { code: '002240', name: '盛新锂能' },
            { code: '002407', name: '多氟多' },
            { code: '002415', name: '海康威视' },
            { code: '002466', name: '天齐锂业' },
            { code: '002475', name: '立讯精密' },
            { code: '002594', name: '比亚迪' },
            { code: '002714', name: '牧原股份' },
            { code: '300059', name: '东方财富' },
            { code: '300750', name: '宁德时代' },
            { code: '600000', name: '浦发银行' },
            { code: '600030', name: '中粮资本' },
            { code: '600036', name: '招商银行' },
            { code: '600089', name: '特变电工' },
            { code: '600111', name: '北方稀土' },
            { code: '600392', name: '盛和资源' },
            { code: '600519', name: '贵州茅台' },
            { code: '600690', name: '海尔智家' },
            { code: '600887', name: '伊利股份' },
            { code: '601012', name: '隆基绿能' },
            { code: '601088', name: '中国神华' },
            { code: '601138', name: '工业富联' },
            { code: '601318', name: '中国平安' },
            { code: '601857', name: '中国石油' },
            { code: '601888', name: '中国中车' },
            { code: '601988', name: '中国银行' },
            { code: '603259', name: '药明康德' },
            { code: '688111', name: '金山办公' },
            { code: '688981', name: '中芯国际' }
        ];
    }
}

// 初始化
async function init() {
    await loadStockData();
    fillTianqiLithiumData();
}

// 初始化应用
init();

const stockNameInput = document.getElementById('stock-name');
const searchStockBtn = document.getElementById('search-stock-btn');
const stockSuggestions = document.getElementById('stock-suggestions');
const stockLoading = document.getElementById('stock-loading');
const dataSourceInfo = document.getElementById('data-source-info');

stockNameInput.addEventListener('input', function() {
    const query = this.value.trim();
    if (query.length === 0) {
        stockSuggestions.classList.remove('show');
        return;
    }
    
    const codeMatch = query.match(/(\d{6})/);
    if (codeMatch) {
        const stockCode = codeMatch[1];
        const stockInfo = stockDatabase.find(s => s.code === stockCode);
        if (stockInfo) {
            stockSuggestions.innerHTML = `
                <div class="suggestion-item" data-code="${stockInfo.code}" data-name="${stockInfo.name}">
                    <span class="suggestion-code">${stockInfo.code}</span>
                    <span class="suggestion-name">${stockInfo.name}</span>
                </div>
            `;
            stockSuggestions.classList.add('show');
            
            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    const code = this.dataset.code;
                    const name = this.dataset.name;
                    stockNameInput.value = `${name} (${code})`;
                    stockSuggestions.classList.remove('show');
                    fetchStockData(code);
                    
                    const stockInfo = stockDatabase.find(s => s.code === code);
                    if (stockInfo) {
                        updateQuantitativeAnalysisStockInfo(stockInfo);
                    } else {
                        updateQuantitativeAnalysisStockInfo({ code: code, name: `股票代码 ${code}` });
                    }
                });
            });
        } else {
            stockSuggestions.classList.remove('show');
        }
        return;
    }
    
    const matches = stockDatabase.filter(stock => 
        stock.name.toLowerCase().includes(query.toLowerCase()) || 
        stock.code.includes(query)
    ).slice(0, 10);
    
    if (matches.length > 0) {
        stockSuggestions.innerHTML = matches.map(stock => `
            <div class="suggestion-item" data-code="${stock.code}" data-name="${stock.name}">
                <span class="suggestion-code">${stock.code}</span>
                <span class="suggestion-name">${stock.name}</span>
            </div>
        `).join('');
        stockSuggestions.classList.add('show');
        
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const code = this.dataset.code;
                const name = this.dataset.name;
                stockNameInput.value = `${name} (${code})`;
                stockSuggestions.classList.remove('show');
                fetchStockData(code);
                
                const stockInfo = stockDatabase.find(s => s.code === code);
                if (stockInfo) {
                    updateQuantitativeAnalysisStockInfo(stockInfo);
                } else {
                    updateQuantitativeAnalysisStockInfo({ code: code, name: `股票代码 ${code}` });
                }
            });
        });
    } else {
        stockSuggestions.classList.remove('show');
    }
});

searchStockBtn.addEventListener('click', function() {
    const query = stockNameInput.value.trim();
    if (query.length === 0) return;
    
    const codeMatch = query.match(/(\d{6})/);
    if (codeMatch) {
        const stockCode = codeMatch[1];
        const stockInfo = stockDatabase.find(s => s.code === stockCode);
        if (stockInfo) {
            stockNameInput.value = `${stockInfo.name} (${stockCode})`;
        } else {
            stockNameInput.value = `股票代码 ${stockCode}`;
        }
        fetchStockData(stockCode);
        
        if (stockInfo) {
            updateQuantitativeAnalysisStockInfo(stockInfo);
        } else {
            updateQuantitativeAnalysisStockInfo({ code: stockCode, name: `股票代码 ${stockCode}` });
        }
    } else {
        const matches = stockDatabase.filter(stock => 
            stock.name.includes(query) || stock.code.includes(query)
        );
        if (matches.length === 1) {
            stockNameInput.value = `${matches[0].name} (${matches[0].code})`;
            fetchStockData(matches[0].code);
            updateQuantitativeAnalysisStockInfo(matches[0]);
        } else if (matches.length > 1) {
            alert('找到多只匹配的股票，请从下拉列表中选择');
        } else {
            // 尝试通过股票名称获取代码（这里可以接入第三方API）
            alert('未找到匹配的股票，请输入6位股票代码进行精确搜索\n\n提示：直接输入6位股票代码可查询任何A股股票');
        }
    }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.stock-search-section')) {
        stockSuggestions.classList.remove('show');
    }
});

// PDF上传和解析功能
const pdfFileInput = document.getElementById('pdf-file');
const uploadPdfBtn = document.getElementById('upload-pdf-btn');
const pdfLoading = document.getElementById('pdf-loading');
const pdfError = document.getElementById('pdf-error');

uploadPdfBtn.addEventListener('click', async function() {
    const file = pdfFileInput.files[0];
    if (!file) {
        showPdfError('请先选择一个PDF文件');
        return;
    }

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        showPdfError('请选择PDF格式的文件');
        return;
    }

    pdfLoading.style.display = 'block';
    pdfError.style.display = 'none';

    try {
        const pdfText = await extractTextFromPdf(file);
        const financialData = parseFinancialDataFromText(pdfText);
        
        if (financialData) {
            displaySuggestions(financialData);
            dataSourceInfo.textContent = '数据来源：上传的PDF文件';
            dataSourceInfo.style.display = 'block';
        } else {
            showPdfError('未能从PDF文件中提取到有效的财务数据');
        }
    } catch (error) {
        console.error('PDF解析失败:', error);
        showPdfError('PDF解析失败，请确保文件格式正确且包含财务数据');
    } finally {
        pdfLoading.style.display = 'none';
    }
});

async function extractTextFromPdf(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async function(e) {
            try {
                const typedArray = new Uint8Array(e.target.result);
                const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
                
                let textContent = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const pageText = content.items.map(item => item.str).join('\n');
                    textContent += pageText + '\n';
                }
                
                resolve(textContent);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = function() {
            reject(new Error('文件读取失败'));
        };
        
        reader.readAsArrayBuffer(file);
    });
}

function parseFinancialDataFromText(text) {
    const parseValue = (pattern) => {
        const match = text.match(pattern);
        if (match) {
            let valueStr = match[1].replace(/,/g, '').replace(/\s/g, '');
            const value = parseFloat(valueStr);
            return isNaN(value) ? 0 : value / 100000000; // 转换为亿元
        }
        return 0;
    };
    
    return {
        cash: parseValue(/现金[\s\S]*?(\d[\d,\s]*\.?\d*)/i) || 
               parseValue(/货币资金[\s\S]*?(\d[\d,\s]*\.?\d*)/i),
        accountsReceivable: parseValue(/应收账款[\s\S]*?(\d[\d,\s]*\.?\d*)/i),
        creditLossRate: 0,
        notesReceivable: parseValue(/应收票据[\s\S]*?(\d[\d,\s]*\.?\d*)/i),
        inventory: parseValue(/存货[\s\S]*?(\d[\d,\s]*\.?\d*)/i),
        tradingFinancialAssets: parseValue(/交易性金融资产[\s\S]*?(\d[\d,\s]*\.?\d*)/i),
        otherCurrentAssets: parseValue(/其他流动资产[\s\S]*?(\d[\d,\s]*\.?\d*)/i),
        nonCurrentAssetsDue: 0,
        plantDepreciation: 0,
        machineryDepreciation: 0,
        constructionInProgress: parseValue(/在建工程[\s\S]*?(\d[\d,\s]*\.?\d*)/i),
        landBookValue: parseValue(/土地使用权[\s\S]*?(\d[\d,\s]*\.?\d*)/i),
        landValueCoefficient: 0,
        goodwill: parseValue(/商誉[\s\S]*?(\d[\d,\s]*\.?\d*)/i),
        companyType: 'cyclical-resource',
        patentTechnologyValue: 0,
        mineralRightsValue: 0,
        productPortfolioValue: 0,
        trainedStaffValue: 0,
        customerRelationshipValue: 0,
        debt: parseValue(/总负债[\s\S]*?(\d[\d,\s]*\.?\d*)/i) || 
              parseValue(/负债合计[\s\S]*?(\d[\d,\s]*\.?\d*)/i)
    };
}

function showPdfError(message) {
    pdfError.textContent = message;
    pdfError.style.display = 'block';
    setTimeout(() => {
        pdfError.style.display = 'none';
    }, 3000);
}

async function fetchStockData(stockCode) {
    stockLoading.style.display = 'block';
    clearSuggestions();
    dataSourceInfo.style.display = 'none';
    
    try {
        const result = await getFinancialData(stockCode);
        if (result && result.data) {
            displaySuggestions(result.data);
            dataSourceInfo.textContent = `数据来源：${result.source}`;
            dataSourceInfo.style.display = 'block';
            
            const stockInfo = stockDatabase.find(s => s.code === stockCode);
            if (stockInfo) {
                updateQuantitativeAnalysisStockInfo(stockInfo);
            } else {
                updateQuantitativeAnalysisStockInfo({ code: stockCode, name: `股票代码 ${stockCode}` });
            }
        } else {
            alert('未能获取到该股票的财报数据，请尝试其他股票或稍后重试');
        }
    } catch (error) {
        console.error('获取财报数据失败:', error);
        alert('获取财报数据失败，请稍后重试');
    } finally {
        stockLoading.style.display = 'none';
    }
}

async function getFinancialData(stockCode) {
    const dataSources = [
        { name: 'Tsanghi', fetch: fetchFromTsanghi },
        { name: 'GuguData', fetch: fetchFromGuguData },
        { name: '聚合数据', fetch: fetchFromJuhe },
        { name: '新浪财经', fetch: fetchFromSina }
    ];
    
    for (const source of dataSources) {
        try {
            console.log(`尝试从 ${source.name} 获取数据...`);
            const data = await source.fetch(stockCode);
            if (data) {
                console.log(`成功从 ${source.name} 获取数据`);
                return { data, source: source.name };
            }
        } catch (error) {
            console.error(`${source.name} 获取失败:`, error.message);
            continue;
        }
    }
    
    console.error('所有数据源均获取失败');
    return null;
}

async function fetchFromSina(stockCode) {
    try {
        const exchange = stockCode.startsWith('6') || stockCode.startsWith('5') ? 'sh' : 'sz';
        const paperCode = `${exchange}${stockCode}`;
        
        const response = await fetch(`https://quotes.sina.cn/cn/api/openapi.php/CompanyFinanceService.getFinanceReport2022?paperCode=${paperCode}&source=fzb&type=4&page=1&num=1`);
        
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        
        const data = await response.json();
        
        if (data && data.result && data.result.data && data.result.data.length > 0) {
            const balanceSheet = data.result.data[0];
            return parseBalanceSheet(balanceSheet);
        }
        
        return null;
    } catch (error) {
        throw error;
    }
}

async function fetchFromJuhe(stockCode) {
    try {
        const response = await fetch(`http://op.juhe.cn/economy/fdmt/bssecu?code=${stockCode}&dtype=json`);
        
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        
        const data = await response.json();
        
        if (data && data.result && data.result.length > 0) {
            return parseJuheData(data.result[0]);
        }
        
        return null;
    } catch (error) {
        throw error;
    }
}

async function fetchFromGuguData(stockCode) {
    try {
        const response = await fetch(`https://api.gugudata.com/stock/cn/annualreport?code=${stockCode}`);
        
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        
        const data = await response.json();
        
        if (data && data.data && data.data.length > 0) {
            return parseGuguData(data.data[0]);
        }
        
        return null;
    } catch (error) {
        throw error;
    }
}

async function fetchFromTsanghi(stockCode) {
    try {
        const exchange = stockCode.startsWith('6') ? 'XSHG' : 'XSHE';
        const response = await fetch(`https://tsanghi.com/api/fin/stock/${exchange}/balance/sheet/yearly?token=demo&ticker=${stockCode}&order=2`);
        
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        
        const data = await response.json();
        
        if (data && data.data && data.data.length > 0) {
            return parseTsanghiData(data.data[0]);
        }
        
        return null;
    } catch (error) {
        throw error;
    }
}

function parseJuheData(data) {
    const parseValue = (value) => {
        if (!value) return 0;
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };
    
    return {
        cash: parseValue(data.cash) / 100000000,
        accountsReceivable: parseValue(data.accounts_receivable) / 100000000,
        creditLossRate: 0,
        notesReceivable: parseValue(data.notes_receivable) / 100000000,
        inventory: parseValue(data.inventory) / 100000000,
        tradingFinancialAssets: parseValue(data.trading_securities) / 100000000,
        otherCurrentAssets: parseValue(data.other_current_assets) / 100000000,
        nonCurrentAssetsDue: 0,
        plantDepreciation: 0,
        machineryDepreciation: 0,
        constructionInProgress: parseValue(data.construction_in_progress) / 100000000,
        landBookValue: parseValue(data.land_use_rights) / 100000000,
        landValueCoefficient: 0,
        goodwill: parseValue(data.goodwill) / 100000000,
        companyType: 'cyclical-resource',
        patentTechnologyValue: 0,
        mineralRightsValue: 0,
        productPortfolioValue: 0,
        trainedStaffValue: 0,
        customerRelationshipValue: 0,
        debt: parseValue(data.total_liabilities) / 100000000
    };
}

function parseGuguData(data) {
    const parseValue = (value) => {
        if (!value) return 0;
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };
    
    return {
        cash: parseValue(data.cash_equivalents) / 100000000,
        accountsReceivable: parseValue(data.accounts_receivable) / 100000000,
        creditLossRate: 0,
        notesReceivable: parseValue(data.notes_receivable) / 100000000,
        inventory: parseValue(data.inventory) / 100000000,
        tradingFinancialAssets: parseValue(data.trading_securities) / 100000000,
        otherCurrentAssets: parseValue(data.other_current_assets) / 100000000,
        nonCurrentAssetsDue: 0,
        plantDepreciation: 0,
        machineryDepreciation: 0,
        constructionInProgress: parseValue(data.construction_in_progress) / 100000000,
        landBookValue: parseValue(data.land_use_rights) / 100000000,
        landValueCoefficient: 0,
        goodwill: parseValue(data.goodwill) / 100000000,
        companyType: 'cyclical-resource',
        patentTechnologyValue: 0,
        mineralRightsValue: 0,
        productPortfolioValue: 0,
        trainedStaffValue: 0,
        customerRelationshipValue: 0,
        debt: parseValue(data.total_liabilities) / 100000000
    };
}

function parseTsanghiData(data) {
    const parseValue = (value) => {
        if (!value) return 0;
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };
    
    return {
        cash: parseValue(data.cash_equivalents) / 100000000,
        accountsReceivable: parseValue(data.accounts_receivable) / 100000000,
        creditLossRate: 0,
        notesReceivable: parseValue(data.notes_receivable) / 100000000,
        inventory: parseValue(data.inventory) / 100000000,
        tradingFinancialAssets: parseValue(data.trading_securities) / 100000000,
        otherCurrentAssets: parseValue(data.other_current_assets) / 100000000,
        nonCurrentAssetsDue: 0,
        plantDepreciation: 0,
        machineryDepreciation: 0,
        constructionInProgress: parseValue(data.construction_in_progress) / 100000000,
        landBookValue: parseValue(data.land_use_rights) / 100000000,
        landValueCoefficient: 0,
        goodwill: parseValue(data.goodwill) / 100000000,
        companyType: 'cyclical-resource',
        patentTechnologyValue: 0,
        mineralRightsValue: 0,
        productPortfolioValue: 0,
        trainedStaffValue: 0,
        customerRelationshipValue: 0,
        debt: parseValue(data.total_liabilities) / 100000000
    };
}

function parseBalanceSheet(data) {
    const parseValue = (value) => {
        if (!value) return 0;
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };
    
    const cash = parseValue(data.cash_equivalents) / 100000000;
    const accountsReceivable = parseValue(data.accounts_receivable) / 100000000;
    const notesReceivable = parseValue(data.notes_receivable) / 100000000;
    const inventory = parseValue(data.inventory) / 100000000;
    const tradingFinancialAssets = parseValue(data.trading_securities) / 100000000;
    const otherCurrentAssets = parseValue(data.other_current_assets) / 100000000;
    const constructionInProgress = parseValue(data.construction_in_progress) / 100000000;
    const landBookValue = parseValue(data.land_use_rights) / 100000000;
    const goodwill = parseValue(data.goodwill) / 100000000;
    const totalAssets = parseValue(data.total_assets) / 100000000;
    const totalLiabilities = parseValue(data.total_liabilities) / 100000000;
    
    return {
        cash: cash,
        accountsReceivable: accountsReceivable,
        creditLossRate: 0,
        notesReceivable: notesReceivable,
        inventory: inventory,
        tradingFinancialAssets: tradingFinancialAssets,
        otherCurrentAssets: otherCurrentAssets,
        nonCurrentAssetsDue: 0,
        plantDepreciation: 0,
        machineryDepreciation: 0,
        constructionInProgress: constructionInProgress,
        landBookValue: landBookValue,
        landValueCoefficient: 0,
        goodwill: goodwill,
        companyType: 'cyclical-resource',
        patentTechnologyValue: 0,
        mineralRightsValue: 0,
        productPortfolioValue: 0,
        trainedStaffValue: 0,
        customerRelationshipValue: 0,
        debt: totalLiabilities
    };
}

function displaySuggestions(data) {
    const suggestions = {
        'suggested-cash': data.cash,
        'suggested-accounts-receivable': data.accountsReceivable,
        'suggested-credit-loss-rate': data.creditLossRate,
        'suggested-notes-receivable': data.notesReceivable,
        'suggested-inventory': data.inventory,
        'suggested-trading-financial-assets': data.tradingFinancialAssets,
        'suggested-other-current-assets': data.otherCurrentAssets,
        'suggested-non-current-assets-due-within-one-year': data.nonCurrentAssetsDue,
        'suggested-plant-depreciation-coefficient': data.plantDepreciation,
        'suggested-machinery-depreciation-coefficient': data.machineryDepreciation,
        'suggested-construction-in-progress': data.constructionInProgress,
        'suggested-land-book-value': data.landBookValue,
        'suggested-land-value-coefficient': data.landValueCoefficient,
        'suggested-goodwill': data.goodwill,
        'suggested-company-type': data.companyType === 'cyclical-resource' ? '周期资源股' : 
                               data.companyType === 'consumer' ? '消费股' : '地产股',
        'suggested-patent-technology-value-cyclical': data.companyType === 'cyclical-resource' ? data.patentTechnologyValue : '',
        'suggested-mineral-rights-value': data.companyType === 'cyclical-resource' ? data.mineralRightsValue : '',
        'suggested-patent-technology-value-consumer': data.companyType === 'consumer' ? data.patentTechnologyValue : '',
        'suggested-product-portfolio-value': data.companyType === 'consumer' ? data.productPortfolioValue : '',
        'suggested-trained-staff-value': data.companyType === 'consumer' ? data.trainedStaffValue : '',
        'suggested-customer-relationship-value': data.companyType === 'consumer' ? data.customerRelationshipValue : '',
        'suggested-debt': data.debt
    };
    
    Object.keys(suggestions).forEach(id => {
        const element = document.getElementById(id);
        if (element && suggestions[id] !== '' && suggestions[id] !== undefined) {
            element.textContent = suggestions[id];
            
            const inputId = id.replace('suggested-', '');
            const inputElement = document.getElementById(inputId);
            
            if (inputElement) {
                inputElement.value = suggestions[id];
                if (inputId === 'company-type') {
                    inputElement.value = data.companyType;
                    inputElement.dispatchEvent(new Event('change'));
                }
            }
            
            element.addEventListener('click', function() {
                if (inputElement) {
                    inputElement.value = suggestions[id];
                    if (inputId === 'company-type') {
                        inputElement.value = data.companyType;
                        inputElement.dispatchEvent(new Event('change'));
                    }
                }
            });
        }
    });
}

function clearSuggestions() {
    document.querySelectorAll('.suggested-value').forEach(el => {
        el.textContent = '';
    });
    dataSourceInfo.style.display = 'none';
}

// 量化分析功能
const analyzeBtn = document.getElementById('analyze-btn');
const qaLoading = document.getElementById('qa-loading');
const qaResult = document.getElementById('qa-result');
let stockPriceRefreshInterval = null;
let currentStockCode = null;

function updateQuantitativeAnalysisStockInfo(stockInfo) {
    document.getElementById('qa-stock-code').textContent = stockInfo.code;
    document.getElementById('qa-stock-name').textContent = stockInfo.name;
    document.getElementById('qa-stock-price').textContent = '-';
    qaResult.style.display = 'none';
    
    if (stockPriceRefreshInterval) {
        clearInterval(stockPriceRefreshInterval);
        stockPriceRefreshInterval = null;
    }
    
    currentStockCode = stockInfo.code;
    startAutoRefreshStockPrice(stockInfo);
}

async function startAutoRefreshStockPrice(stockInfo) {
    const stockCode = stockInfo.code;
    const stockPriceElement = document.getElementById('qa-stock-price');
    
    const updatePrice = async () => {
        try {
            const stockData = await fetchStockPrice(stockCode);
            if (stockData && stockData.currentPrice) {
                stockPriceElement.textContent = `¥${stockData.currentPrice.toFixed(2)}`;
                
                if (qaResult.style.display !== 'none') {
                    const analysis = performQuantitativeAnalysis(stockData);
                    updateAnalysisDisplay(analysis);
                }
            }
        } catch (error) {
            console.error('刷新股价失败:', error);
        }
    };
    
    await updatePrice();
    
    stockPriceRefreshInterval = setInterval(async () => {
        await updatePrice();
    }, 3000);
}

analyzeBtn.addEventListener('click', async function() {
    const stockCodeMatch = stockNameInput.value.match(/(\d{6})/);
    if (!stockCodeMatch) {
        alert('请先搜索并选择一个股票');
        return;
    }

    const stockCode = stockCodeMatch[1];
    let stockInfo = stockDatabase.find(s => s.code === stockCode);
    
    if (!stockInfo) {
        stockInfo = { code: stockCode, name: `股票代码 ${stockCode}` };
    }

    qaLoading.style.display = 'block';
    qaResult.style.display = 'none';

    try {
        const stockData = await fetchStockPrice(stockCode);
        if (stockData) {
            const analysis = performQuantitativeAnalysis(stockData);
            displayAnalysisResult(stockInfo, stockData, analysis);
        } else {
            alert('获取股价数据失败，请稍后重试');
        }
    } catch (error) {
        console.error('量化分析失败:', error);
        alert('量化分析失败，请稍后重试');
    } finally {
        qaLoading.style.display = 'none';
    }
});

async function fetchStockPrice(stockCode) {
    console.log('开始获取股价:', stockCode);
    const exchange = stockCode.startsWith('6') ? 'sh' : 'sz';
    const url = `https://qt.gtimg.cn/q=${exchange}${stockCode}`;
    
    console.log('URL:', url);
    
    try {
        const response = await fetch(url);
        const text = await response.text();
        
        console.log('Response:', text.substring(0, 200));
        
        const match = text.match(/="([^"]+)"/);
        if (match && match[1]) {
            const data = match[1].split('~');
            console.log('Data length:', data.length);
            
            if (data.length >= 42) {
                const currentPrice = parseFloat(data[3]);
                const openPrice = parseFloat(data[5]);
                const highPrice = parseFloat(data[33]);
                const lowPrice = parseFloat(data[34]);
                const prevClose = parseFloat(data[4]);
                
                console.log('解析数据:', { currentPrice, openPrice, highPrice, lowPrice, prevClose });
                
                if (!isNaN(currentPrice) && !isNaN(openPrice) && !isNaN(highPrice) && !isNaN(lowPrice) && !isNaN(prevClose)) {
                    return {
                        currentPrice,
                        openPrice,
                        highPrice,
                        lowPrice,
                        prevClose,
                        volume: parseInt(data[6]) || 0,
                        amount: parseFloat(data[37]) || 0
                    };
                }
            }
        }
        
        console.error('数据格式错误');
        return null;
    } catch (error) {
        console.error('获取股价数据失败:', error);
        return null;
    }
}

function performQuantitativeAnalysis(stockData) {
    const { currentPrice, openPrice, highPrice, lowPrice, prevClose } = stockData;
    
    const priceChange = currentPrice - prevClose;
    const priceChangePercent = (priceChange / prevClose) * 100;
    
    const ma5 = calculateMA(currentPrice, prevClose, priceChange);
    const ma10 = calculateMA(currentPrice, prevClose, priceChange * 0.8);
    
    const macd = calculateMACD(currentPrice, prevClose, priceChange);
    const rsi = calculateRSI(currentPrice, highPrice, lowPrice, prevClose);
    
    const steps = [];
    
    steps.push({
        description: '价格变动',
        content: `当前价 ¥${currentPrice.toFixed(2)} vs 昨收价 ¥${prevClose.toFixed(2)}`,
        result: priceChange >= 0 ? `+${priceChangePercent.toFixed(2)}%` : `${priceChangePercent.toFixed(2)}%`,
        type: priceChange >= 0 ? 'positive' : 'negative'
    });
    
    steps.push({
        description: 'MA5计算',
        content: `5日均线 = ¥${ma5.toFixed(2)}`,
        result: currentPrice >= ma5 ? '价格在均线上方' : '价格在均线下方',
        type: 'neutral'
    });
    
    steps.push({
        description: 'MA10计算',
        content: `10日均线 = ¥${ma10.toFixed(2)}`,
        result: currentPrice >= ma10 ? '价格在均线上方' : '价格在均线下方',
        type: 'neutral'
    });
    
    steps.push({
        description: 'MACD分析',
        content: `MACD = ${macd.toFixed(4)}`,
        result: macd > 0 ? '金叉，看涨信号' : '死叉，看跌信号',
        type: macd > 0 ? 'positive' : 'negative'
    });
    
    steps.push({
        description: 'RSI分析',
        content: `RSI(14) = ${rsi.toFixed(2)}`,
        result: rsi > 70 ? '超买区域，风险较高' : rsi < 30 ? '超卖区域，机会较大' : '正常区间',
        type: rsi > 70 ? 'negative' : rsi < 30 ? 'positive' : 'neutral'
    });
    
    let decision = 'hold';
    let confidence = 0;
    let decisionReason = '';
    
    console.log('决策判断:', { macd, rsi, priceChangePercent });
    
    if (macd > 0 && rsi < 70 && priceChangePercent > 0) {
        decision = 'buy';
        confidence = Math.min(100, (macd * 10 + (70 - rsi) + priceChangePercent * 2));
        decisionReason = 'MACD金叉 + RSI未超买 + 价格上涨 = 建议买入';
        console.log('决策结果: 买入');
    } else if (macd < 0 && rsi > 30 && priceChangePercent < 0) {
        decision = 'sell';
        confidence = Math.min(100, (Math.abs(macd) * 10 + (rsi - 30) + Math.abs(priceChangePercent) * 2));
        decisionReason = 'MACD死叉 + RSI未超卖 + 价格下跌 = 建议卖出';
        console.log('决策结果: 卖出');
    } else {
        decisionReason = '指标信号不明确 = 建议持有观望';
        console.log('决策结果: 持有');
    }
    
    console.log('最终决策:', decision);
    console.log('决策理由:', decisionReason);
    
    steps.push({
        description: '综合决策',
        content: '基于以上指标综合判断',
        result: decisionReason,
        type: decision === 'buy' ? 'positive' : decision === 'sell' ? 'negative' : 'neutral'
    });
    
    return {
        macd,
        rsi,
        ma5,
        ma10,
        decision,
        confidence,
        priceChange,
        priceChangePercent,
        steps
    };
}

function calculateMA(currentPrice, prevClose, priceChange) {
    return (currentPrice + prevClose + priceChange * 0.5) / 2;
}

function calculateMACD(currentPrice, prevClose, priceChange) {
    const ema12 = (currentPrice * 0.1538 + prevClose * 0.8462);
    const ema26 = (currentPrice * 0.0741 + prevClose * 0.9259);
    const dif = ema12 - ema26;
    const dea = dif * 0.2;
    return dif - dea;
}

function calculateRSI(currentPrice, highPrice, lowPrice, prevClose) {
    const avgGain = (highPrice - prevClose + currentPrice - lowPrice) / 2;
    const avgLoss = (prevClose - lowPrice + highPrice - currentPrice) / 2;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    
    return Math.max(0, Math.min(100, rsi));
}

function displayAnalysisResult(stockInfo, stockData, analysis) {
    document.getElementById('qa-stock-code').textContent = stockInfo.code;
    document.getElementById('qa-stock-name').textContent = stockInfo.name;
    document.getElementById('qa-stock-price').textContent = `¥${stockData.currentPrice.toFixed(2)}`;
    
    updateAnalysisDisplay(analysis);
    qaResult.style.display = 'block';
}

function updateAnalysisDisplay(analysis) {
    const decisionElement = document.getElementById('decision-value');
    decisionElement.textContent = analysis.decision === 'buy' ? '买入' : 
                                 analysis.decision === 'sell' ? '卖出' : '持有';
    decisionElement.className = `decision-value ${analysis.decision}`;
    
    document.getElementById('macd-value').textContent = analysis.macd.toFixed(4);
    document.getElementById('rsi-value').textContent = analysis.rsi.toFixed(2);
    document.getElementById('ma5-value').textContent = analysis.ma5.toFixed(2);
    document.getElementById('ma10-value').textContent = analysis.ma10.toFixed(2);
    
    const analysisProcess = document.getElementById('analysis-process');
    const analysisSteps = document.getElementById('analysis-steps');
    
    if (analysis.steps && analysis.steps.length > 0) {
        analysisProcess.style.display = 'block';
        analysisSteps.innerHTML = analysis.steps.map((step, index) => `
            <div class="analysis-step">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <div class="step-description">${step.description}</div>
                    <div class="step-detail">${step.content}</div>
                </div>
                <div class="step-result ${step.type}">${step.result}</div>
            </div>
        `).join('');
    } else {
        analysisProcess.style.display = 'none';
    }
}
