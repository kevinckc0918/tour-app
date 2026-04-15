import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Calculator, 
  ShoppingCart, 
  Coffee, 
  Briefcase,
  ChevronDown,
  ChevronUp,
  Camera,
  Train,
  Landmark,
  Plus,
  Trash2,
  Car,
  Users,
  Minus,
  Utensils,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

const itineraryData = [
  {
    day: 1,
    title: '深圳出發 → 鎮遠古城 17/4(五)',
    highlights: ['福田口岸集合', '高鐵(深圳北至從江/貴陽)', '鎮遠古城'],
    details: '於福田口岸集合，乘搭地鐵到深圳北站轉乘高鐵前往從江/貴陽站（車程約4.5小時）。抵達後遊覽中國四大古城之一的【鎮遠古城】，欣賞石板小街、祝聖橋、舞陽河風光及古城夜景。',
    icon: Train,
    meals: '早餐：自理 | 午餐：自理 | 晚餐：苗家風味',
    hotel: '鎮遠準4星 四季酒店/古城客棧/同級'
  },
  {
    day: 2,
    title: '鎮遠 → 濯水',
    highlights: ['桃花源風景區', '濯水古鎮 18/4(六)'],
    details: '前往酉陽區，遊覽國家5A級景區【桃花源風景區】（包門票），欣賞充滿古樸田園風光的各個景點，包括古桃源、桃花源森林公園等。之後參觀集土家吊腳樓群落及水運碼頭於一身的千年【濯水古鎮】（包門票）。',
    icon: Landmark,
    meals: '早餐：酒店 | 午餐：酉陽土雞風味 | 晚餐：土家老臘肉風味',
    hotel: '濯水準4星 誠悅莊客棧/同級'
  },
  {
    day: 3,
    title: '濯水 → 武隆',
    highlights: ['蚩尤九黎城', '武隆天生三橋 19/4(日)'],
    details: '遊覽中國最大的苗族建築群落【蚩尤九黎城】（包門票），參觀九黎神柱及最高最大的吊腳樓建築體九黎宮等。其後前往張藝謀電影《黃金甲》唯一外景地【武隆天生三橋】（包門票及換乘車），觀賞天龍橋、青龍橋、黑龍橋等自然奇觀。',
    icon: Camera,
    meals: '早餐：酒店 | 午餐：農家豆花風味 | 晚餐：武隆竹籠風味',
    hotel: '武隆準4星 戴斯酒店/依雲度假酒店/同級'
  },
  {
    day: 4,
    title: '武隆 → 重慶',
    highlights: ['816核工廠', '洪崖洞', '解放碑', '朝天門 20/4(一)'],
    details: '參觀中國工業遺產【涪陵816核工廠景區】（包門票），探索世界第一大人工洞體。下午前往重慶主城區，遊覽解放碑商業中心、朝天門廣場、洪崖洞民俗區及千撕門大橋。晚上可自選參與自費項目：重慶地道老火鍋 / 8D魔幻山城深度夜遊。',
    icon: MapPin,
    meals: '早餐：酒店 | 午餐：酸菜魚風味 | 晚餐：重慶老火鍋 (自費套票)',
    hotel: '重慶準5星 奧蘭國際酒店/華美達酒店/同級'
  },
  {
    day: 5,
    title: '重慶市內觀光',
    highlights: ['磁器口古鎮', '彈子石老街', '山城巷 21/4(二)'],
    details: '暢遊【磁器口古鎮】（包門票）、彈子石老街及山城巷，體驗地道重慶風情。團友可根據喜好選購自費套餐：網紅皇冠大扶梯、長江索道，或登上雲端之眼俯瞰重慶全景及兩江四岸風景。',
    icon: Camera,
    meals: '早餐：酒店 | 午餐：磁器口小吃街自理 | 晚餐：江湖菜風味',
    hotel: '重慶準5星 奧蘭國際酒店/華美達酒店/同級'
  },
  {
    day: 6,
    title: '重慶 → 深圳回程',
    highlights: ['三峽博物館', '李子壩輕軌', '高鐵回程 22/4(三)'],
    details: '參觀國家一級博物館【三峽博物館】。隨後前往網紅景點【李子壩】（包門票）體驗輕軌穿樓奇景，並外觀人民大禮堂。最後於重慶西站乘搭高鐵返回深圳北站（車程約6.5小時），關口解散，結束愉快旅程。',
    icon: Train,
    meals: '早餐：酒店 | 午餐：川菜風味 | 晚餐：自理',
    hotel: '溫暖的家'
  }
];

const dynamicCategories = [
  { id: 'optionalTours', label: '自費項目 (每人)', icon: <Camera size={18} />, helper: '請輸入每人費用 (如：老火鍋¥158 / 夜遊¥198)' },
  { id: 'food', label: '餐飲開支 (全單總數)', icon: <Coffee size={18} />, helper: '請輸入帳單總數，系統會自動按人數平攤', isShared: true },
  { id: 'shopping', label: '購物及手信 (每人)', icon: <ShoppingCart size={18} />, helper: '請輸入個人花費' },
  { id: 'transport', label: '當地交通 (每人)', icon: <Car size={18} /> },
  { id: 'others', label: '其他雜費 (每人)', icon: <DollarSign size={18} /> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'calculator' | 'poster'
  const [expandedDay, setExpandedDay] = useState(1);
  const [currency, setCurrency] = useState('HKD');
  const [travelers, setTravelers] = useState(2);
  
  const [fixedExpenses, setFixedExpenses] = useState({
    tourFee: '3199',
    serviceFee: '600',
    insurance: '230',
  });

  const [dynamicExpenses, setDynamicExpenses] = useState({
    optionalTours: [
      { id: 'default-opt-1', desc: '火鍋加景點門票', amount: '598' }
    ],
    food: [],
    shopping: [],
    transport: [],
    others: []
  });

  const handleFixedChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFixedExpenses(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddDynamic = (category) => {
    setDynamicExpenses(prev => ({
      ...prev,
      [category]: [...prev[category], { id: Date.now(), desc: '', amount: '' }]
    }));
  };

  const handleUpdateDynamic = (category, id, field, value) => {
    if (field === 'amount' && value !== '' && !/^\d*\.?\d*$/.test(value)) {
      return; 
    }
    setDynamicExpenses(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleRemoveDynamic = (category, id) => {
    setDynamicExpenses(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const adjustTravelers = (amount) => {
    setTravelers(prev => Math.max(1, prev + amount));
  };

  const calculateTotals = () => {
    let perPersonFixed = 0;
    Object.values(fixedExpenses).forEach(val => {
      const num = parseFloat(val);
      if (!isNaN(num)) perPersonFixed += num;
    });

    let perPersonDynamic = 0;
    Object.entries(dynamicExpenses).forEach(([category, arr]) => {
      arr.forEach(item => {
        const num = parseFloat(item.amount);
        if (!isNaN(num)) {
          if (category === 'food') {
            perPersonDynamic += (num / travelers);
          } else {
            perPersonDynamic += num;
          }
        }
      });
    });

    const totalPerPerson = perPersonFixed + perPersonDynamic;
    const totalGroup = totalPerPerson * travelers;

    return {
      perPerson: totalPerPerson.toFixed(2),
      group: totalGroup.toFixed(2)
    };
  };

  const totals = calculateTotals();

  const clearForm = () => {
    if (window.confirm("確定要重置數據並回復到預設值嗎？")) {
      setFixedExpenses({
        tourFee: '3199',
        serviceFee: '600',
        insurance: '230',
      });
      setDynamicExpenses({
        optionalTours: [
          { id: Date.now().toString(), desc: '火鍋加景點門票', amount: '598' }
        ],
        food: [],
        shopping: [],
        transport: [],
        others: []
      });
      setTravelers(2);
    }
  };

  // 處理圖片載入失敗
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
              <MapPin className="h-6 w-6 text-white" />
              魔幻重慶 高鐵6天團 (旗號：K536號旗)
            </h1>
            <p className="mt-1 text-white opacity-90 text-xs md:text-sm text-left">
              日期 : 2026年4月17日 (星期五) 至 2026年4月22日 (星期三)
            </p>            
            <p className="mt-1 text-white opacity-90 text-xs md:text-sm text-left">
              集合地點：早上07:50福田口岸11號門外集合
            </p>
            <p className="mt-1 text-white opacity-90 text-xs md:text-sm text-left">
              國內全陪：張文銓18682316932
            </p>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-t border-indigo-600/50 bg-indigo-800/50">
          {/* 1. 每日行程 */}
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-2.5 md:py-3.5 text-xs md:text-base font-bold transition-colors relative ${
              activeTab === 'itinerary' ? 'text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700/50'
            }`}
          >
            <Calendar size={18} />
            <span>每日行程</span>
            {activeTab === 'itinerary' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>}
          </button>
          
          {/* 2. 旅費計算 */}
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-2.5 md:py-3.5 text-xs md:text-base font-bold transition-colors relative ${
              activeTab === 'calculator' ? 'text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700/50'
            }`}
          >
            <Calculator size={18} />
            <span>旅費計算</span>
            {activeTab === 'calculator' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>}
          </button>

          {/* 3. 原版海報 */}
          <button
            onClick={() => setActiveTab('poster')}
            className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-2.5 md:py-3.5 text-xs md:text-base font-bold transition-colors relative ${
              activeTab === 'poster' ? 'text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700/50'
            }`}
          >
            <FileText size={18} />
            <span>原版海報</span>
            {activeTab === 'poster' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        
        {/* Tab 1: Itinerary */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-3">
              {itineraryData.map((day) => {
                const isExpanded = expandedDay === day.day;
                const Icon = day.icon;
                
                return (
                  <div key={day.day} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-200">
                    <button 
                      onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                      className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 text-indigo-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">
                          D{day.day}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-800">{day.title}</h3>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                            {day.highlights.join(' • ')}
                          </p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="text-slate-400 shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
                    </button>
                    
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50">
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-5">
                          {day.details}
                        </p>
                        
                        <div className="flex flex-col gap-2.5">
                          {/* 膳食安排 */}
                          <div className="flex items-start gap-2 text-sm text-orange-800 bg-orange-50 p-3 rounded-lg border border-orange-100/50">
                            <Utensils className="w-5 h-5 shrink-0 mt-0.5 text-orange-600" />
                            <div>
                              <span className="font-bold block mb-1 text-orange-900">餐飲安排：</span>
                              {day.meals}
                            </div>
                          </div>

                          {/* 住宿安排 */}
                          <div className="flex items-start gap-2 text-sm text-indigo-800 bg-indigo-50 p-3 rounded-lg border border-indigo-100/50">
                            <Icon className="w-5 h-5 shrink-0 mt-0.5 text-indigo-600" />
                            <div>
                              <span className="font-bold block mb-1 text-indigo-900">住宿安排：</span>
                              {day.hotel}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Calculator */}
        {activeTab === 'calculator' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 mb-24">
              
              <div className="flex items-center justify-between mb-4 border-b pb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                  <Calculator className="text-emerald-600" size={20} />
                  開支明細
                </h2>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="text-sm border-slate-300 rounded-md bg-slate-50 text-slate-700 focus:ring-emerald-500 focus:border-emerald-500 py-1.5"
                >
                  <option value="HKD">HKD ($)</option>
                  <option value="RMB">RMB (¥)</option>
                </select>
              </div>

              {/* Number of Travelers Control */}
              <div className="flex items-center justify-between bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 mb-6">
                <div className="flex items-center gap-2 font-bold text-indigo-800">
                  <Users size={18} /> 同行人數
                </div>
                <div className="flex items-center gap-1 bg-white rounded-lg border border-indigo-200 p-1 shadow-sm">
                  <button 
                    onClick={() => adjustTravelers(-1)}
                    className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    disabled={travelers <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-lg w-8 text-center text-slate-800">{travelers}</span>
                  <button 
                    onClick={() => adjustTravelers(1)}
                    className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-md transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Fixed Expenses Section */}
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-1">基本固定開支 (每人)</h3>
                <FixedExpenseInput 
                  label="基本團費" name="tourFee" value={fixedExpenses.tourFee} 
                  onChange={handleFixedChange} icon={<Briefcase size={18} />} currency={currency}
                />
                <FixedExpenseInput 
                  label="旅行團服務費 (導遊小費)" name="serviceFee" value={fixedExpenses.serviceFee} 
                  onChange={handleFixedChange} icon={<DollarSign size={18} />} currency={currency}
                  helperText="海報註明每人每天$100，6天共$600"
                />
                <FixedExpenseInput 
                  label="旅遊綜合保險" name="insurance" value={fixedExpenses.insurance} 
                  onChange={handleFixedChange} icon={<Briefcase size={18} />} currency={currency}
                  helperText="海報提及指定保險為$230"
                />
              </div>

              {/* Dynamic Expenses Section */}
              <div className="space-y-5 pt-2">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-1">浮動多項開支</h3>
                
                {dynamicCategories.map(cat => (
                  <div key={cat.id} className={`border rounded-xl p-4 ${cat.isShared ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <label className={`text-sm font-bold flex items-center gap-1.5 ${cat.isShared ? 'text-orange-800' : 'text-slate-700'}`}>
                          <span className={cat.isShared ? 'text-orange-600' : 'text-slate-500'}>{cat.icon}</span>
                          {cat.label}
                        </label>
                        {cat.helper && <p className={`text-xs mt-0.5 ${cat.isShared ? 'text-orange-600/80' : 'text-slate-500'}`}>{cat.helper}</p>}
                      </div>
                      <button 
                        onClick={() => handleAddDynamic(cat.id)}
                        className={`flex items-center gap-1 text-xs px-2 py-1.5 rounded-md transition-colors font-medium ${cat.isShared ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                      >
                        <Plus size={14} /> 新增
                      </button>
                    </div>

                    {dynamicExpenses[cat.id].length > 0 ? (
                      <div className="space-y-3 mt-3">
                        {dynamicExpenses[cat.id].map((entry, index) => (
                          <div key={entry.id} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400 font-medium w-3 text-center">{index + 1}.</span>
                              
                              <div className="flex flex-1 gap-2">
                                <input
                                  type="text"
                                  placeholder="名稱"
                                  value={entry.desc}
                                  onChange={(e) => handleUpdateDynamic(cat.id, entry.id, 'desc', e.target.value)}
                                  className="w-1/2 rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm py-1.5 px-2.5"
                                />
                                <div className="relative w-1/2">
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400 text-sm">{currency === 'HKD' ? '$' : '¥'}</span>
                                  <input
                                    type="text"
                                    placeholder="總額"
                                    value={entry.amount}
                                    onChange={(e) => handleUpdateDynamic(cat.id, entry.id, 'amount', e.target.value)}
                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm py-1.5 pl-6 pr-2"
                                  />
                                </div>
                              </div>

                              <button 
                                onClick={() => handleRemoveDynamic(cat.id, entry.id)}
                                className="text-red-400 hover:text-red-600 p-1 shrink-0"
                                title="刪除"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            
                            {cat.isShared && entry.amount && !isNaN(parseFloat(entry.amount)) && (
                              <div className="text-xs text-orange-600 font-medium text-right pr-8 flex items-center justify-end gap-1">
                                平攤每人: {currency === 'HKD' ? '$' : '¥'} {(parseFloat(entry.amount) / travelers).toFixed(2)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-2 italic border border-dashed border-slate-200 rounded-md bg-white/50 mt-2">
                        尚未新增任何項目
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <button 
                  onClick={clearForm}
                  className="text-sm text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1 font-medium bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={14} /> 重置所有數據
                </button>
              </div>

            </div>
            
            {/* Sticky Total Display at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-30">
              <div className="max-w-3xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-10 pointer-events-none">
                  <Calculator size={100} />
                </div>
                <div>
                  <p className="text-emerald-100 text-xs md:text-sm font-medium mb-0.5">每人預計總開支</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg md:text-2xl font-bold">{currency === 'HKD' ? '$' : '¥'}</span>
                    <span className="text-2xl md:text-4xl font-extrabold tracking-tight">
                      {totals.perPerson}
                    </span>
                  </div>
                </div>
                <div className="text-right border-l border-emerald-400/30 pl-4 py-1 z-10">
                  <p className="text-emerald-100 text-[10px] md:text-xs mb-0.5">{travelers} 人同行總費用</p>
                  <p className="font-bold text-sm md:text-base">
                    {currency === 'HKD' ? '$' : '¥'} {totals.group}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Poster (Moved to last) */}
        {activeTab === 'poster' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 text-center">
              <h2 className="text-lg md:text-xl font-bold flex items-center justify-center gap-2 text-slate-700 mb-2">
                <FileText className="text-indigo-600" size={24} />
                原版行程海報
              </h2>

              <div className="space-y-6">
                {/* 圖片 1 */}
                <div className="relative w-full rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200">
                  <img 
                    src="/poster1.jpg" 
                    alt="重慶高鐵團海報 第1頁" 
                    className="w-full h-auto block"
                    onError={handleImageError}
                  />
                  {/* Fallback 佔位符 */}
                  <div className="hidden flex-col items-center justify-center w-full aspect-[1/1.4] bg-slate-100 text-slate-400 p-6">
                    <ImageIcon size={64} className="mb-4 opacity-30" />
                    <p className="font-bold text-slate-500 mb-1">找不到第一頁圖片</p>
                    <p className="text-xs text-slate-400">請確保 public/poster1.jpg 檔案存在</p>
                  </div>
                </div>

                {/* 圖片 2 */}
                <div className="relative w-full rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200">
                  <img 
                    src="/poster2.jpg" 
                    alt="重慶高鐵團海報 第2頁" 
                    className="w-full h-auto block"
                    onError={handleImageError}
                  />
                  {/* Fallback 佔位符 */}
                  <div className="hidden flex-col items-center justify-center w-full aspect-[1/1.4] bg-slate-100 text-slate-400 p-6">
                    <ImageIcon size={64} className="mb-4 opacity-30" />
                    <p className="font-bold text-slate-500 mb-1">找不到第二頁圖片</p>
                    <p className="text-xs text-slate-400">請確保 public/poster2.jpg 檔案存在</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

function FixedExpenseInput({ label, name, value, onChange, icon, currency, helperText }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-1 flex justify-between">
        <span className="flex items-center gap-1.5">
          <span className="text-slate-500">{icon}</span>
          {label}
        </span>
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-slate-500 sm:text-sm">{currency === 'HKD' ? '$' : '¥'}</span>
        </div>
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-slate-300 pl-8 pr-12 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm py-2 bg-white border transition-colors font-medium"
          placeholder="0.00"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-slate-400 sm:text-sm font-medium">{currency}</span>
        </div>
      </div>
      {helperText && <p className="text-xs text-slate-500 mt-1 ml-1">{helperText}</p>}
    </div>
  );
}