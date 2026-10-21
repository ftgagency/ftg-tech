'use strict';
const offers={
 video:{title:'TẠO TOOL SẢN XUẤT VIDEO AI',price:'5.000.000₫',description:'Học tạo tool sản xuất video AI phục vụ TikTok Affiliate, view ngoại và YouTube. Chi phí công cụ, hạn mức miễn phí và hạ tầng có thể thay đổi.',detail:'../#huong-dan-tao-tool'},
 marketing:{title:'QUẢNG CÁO & NỘI DUNG BẰNG AI',price:'10.000.000₫',description:'Ứng dụng AI cho quảng cáo, tối ưu nội dung, quy trình đăng bài và trả lời tin nhắn hỗ trợ bán hàng.',detail:'../#khoa-hoc'},
 n8n:{title:'AUTOMATION VỚI N8N',price:'10.000.000₫',description:'Học cài đặt n8n, xây dựng workflow và ứng dụng quy trình tự động hóa vào công việc.',detail:'../#khoa-hoc'},
 multi:{title:'MULTI-AGENT CHO DOANH NGHIỆP',price:'5.000.000₫',description:'Học cách điều phối nhiều Agent để phối hợp, phân công và xử lý công việc giữa các phòng ban.',detail:'../#khoa-hoc'},
 ceo:{title:'SIÊU TRỢ LÝ AI CHO CEO — XÂY BỘ NÃO THỨ 2',price:'LIÊN HỆ HỎI HỌC PHÍ',description:'Trao đổi về phạm vi setup, nội dung học và cách sử dụng trợ lý AI theo doanh nghiệp. Chương trình chưa công bố học phí; đây không phải gói coaching 100 triệu.',detail:'../#sieu-tro-ly-ai'},
 coaching:{title:'COACHING & TƯ VẤN ĐỊNH HƯỚNG',price:'100.000.000₫',description:'Tư vấn định hướng doanh nghiệp, nghề nghiệp và lộ trình phát triển kỹ năng AI, Automation, Multi-Agent. Hỏi rõ phạm vi và hình thức trước khi đăng ký.',detail:'../#khoa-hoc'},
 veo:{title:'TOOL TẠO VIDEO VEO 3',price:'300.000₫ / THÁNG',description:'Thuê tool tạo video bằng Veo 3 theo tháng. Đây là công cụ bổ trợ, không phải khóa học; hỏi FTG về tính năng, hạn mức và cách nhận sản phẩm.',detail:'../#veo3'},
 beginner:{title:'ZOOM AI AGENT MIỄN PHÍ HẰNG TUẦN',price:'MIỄN PHÍ',description:'Dành cho người mới chưa biết gì về AI Agent. Bắt đầu bằng buổi Zoom online miễn phí; nhắn FTG để hỏi lịch gần nhất và cách tham gia.',detail:'#zoom'}
};
let selectedGoal='';
const status=document.getElementById('status');let statusTimer;
function notify(message){status.textContent=message;clearTimeout(statusTimer);statusTimer=setTimeout(()=>{status.textContent='';},5000);}
function track(name,data){if(typeof window.fbq==='function')window.fbq('trackCustom',name,data);}
document.getElementById('route-form').addEventListener('submit',event=>{
 event.preventDefault();const selected=new FormData(event.currentTarget).get('goal');const offer=offers[selected];if(!offer)return;selectedGoal=selected;
 document.getElementById('result-title').textContent=offer.title;
 document.getElementById('result-price').textContent=offer.price;
 document.getElementById('result-description').textContent=offer.description;
 document.getElementById('result-detail').setAttribute('href',offer.detail);
 const message=selected==='beginner'?document.getElementById('zoom-message').textContent:`Chào FTG, tôi quan tâm ${offer.title}. Tôi muốn hỏi nội dung, lịch và hình thức tham gia, học phí cùng chi phí công cụ (nếu có). Nhờ FTG tư vấn lộ trình phù hợp. Tôi cũng muốn nhận thông tin Zoom AI Agent miễn phí hằng tuần.`;
 document.getElementById('consult-message').textContent=message;
 const result=document.getElementById('recommendation');result.hidden=false;
 document.getElementById('result-title').focus({preventScroll:true});result.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 track('FunnelGoalSelected',{goal:selected,content_name:offer.title});
});
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
 const text=document.getElementById(button.dataset.copy).textContent;
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}else{const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();const copied=document.execCommand('copy');area.remove();if(!copied)throw new Error('copy failed');}notify('Đã sao chép. Mở Zalo và dán tin nhắn để gửi cho FTG.');}
 catch(error){notify('Chưa sao chép được. Bạn có thể chọn và sao chép trực tiếp phần tin nhắn phía trên.');}
}));
document.querySelectorAll('[data-contact]').forEach(link=>link.addEventListener('click',()=>{track('FunnelZaloClick',{entry:link.dataset.contact,goal:link.id==='consult-link'?selectedGoal:''});}));

// Only explicit form submission sends contact data to FormSubmit; no autoresponse.
const registrationForm=document.getElementById('registration-form');
registrationForm.addEventListener('submit',()=>{
 document.getElementById('submitted-at').value=new Date().toISOString();
 const button=registrationForm.querySelector('button[type="submit"]');
 button.disabled=true;button.textContent='ĐANG CHUYỂN SANG FORMSUBMIT…';
});
window.addEventListener('pageshow',()=>{
 const button=registrationForm.querySelector('button[type="submit"]');
 button.disabled=false;button.textContent='GỬI YÊU CẦU TƯ VẤN ↗';
});
if(new URLSearchParams(window.location.search).get('da-gui')==='1'){
 const message=document.getElementById('registration-status');
 message.textContent='Bạn đã quay lại từ bước gửi qua FormSubmit. FTG sẽ kiểm tra yêu cầu và liên hệ để xác nhận; đây chưa phải xác nhận chỗ học. Nếu chưa hoàn tất bước gửi hoặc cần hỗ trợ, hãy nhắn Zalo 0918 212 460.';
 message.hidden=false;
}
