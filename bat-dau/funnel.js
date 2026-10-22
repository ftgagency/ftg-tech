'use strict';
const status=document.getElementById('status');let statusTimer;
function notify(message){status.textContent=message;clearTimeout(statusTimer);statusTimer=setTimeout(()=>{status.textContent='';},5000);}
function track(name,data){if(typeof window.fbq==='function')window.fbq('trackCustom',name,data);}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
 const text=document.getElementById(button.dataset.copy).textContent;
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}else{const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();const copied=document.execCommand('copy');area.remove();if(!copied)throw new Error('copy failed');}notify('Đã sao chép. Mở Zalo và dán tin nhắn để gửi cho FTG.');}
 catch(error){notify('Chưa sao chép được. Bạn có thể chọn và sao chép trực tiếp phần tin nhắn phía trên.');}
}));
document.querySelectorAll('[data-contact]').forEach(link=>link.addEventListener('click',()=>{track('FunnelZaloClick',{entry:link.dataset.contact});}));

// Only explicit form submission sends contact data to FormSubmit; no autoresponse.
const registrationForm=document.getElementById('registration-form');
registrationForm.addEventListener('submit',()=>{
 document.getElementById('submitted-at').value=new Date().toISOString();
 const button=registrationForm.querySelector('button[type="submit"]');
 button.disabled=true;button.textContent='ĐANG CHUYỂN SANG FORMSUBMIT…';
 track('FunnelLeadSubmit',{content_name:'Khóa Quảng cáo Facebook & TikTok bằng AI'});
});
window.addEventListener('pageshow',()=>{
 const button=registrationForm.querySelector('button[type="submit"]');
 button.disabled=false;button.textContent='GỬI YÊU CẦU TƯ VẤN ↗';
});
if(new URLSearchParams(window.location.search).get('da-gui')==='1'){
 const message=document.getElementById('registration-status');
 message.textContent='Bạn đã quay lại từ bước gửi qua FormSubmit. FTG sẽ kiểm tra yêu cầu khóa Quảng cáo Facebook & TikTok bằng AI (10.000.000₫) và liên hệ để xác nhận; đây chưa phải xác nhận chỗ học. Nếu chưa hoàn tất bước gửi hoặc cần hỗ trợ, hãy nhắn Zalo 0918 212 460.';
 message.hidden=false;
}
