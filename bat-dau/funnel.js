'use strict';
const status=document.getElementById('status');let statusTimer;
const REGISTRATION_ENDPOINT='https://ftg-registration-sheet.bebu-ftg.workers.dev/register';
const ZALO_GROUP='https://zalo.me/g/so3c4ch6mzibuyosyxde';
function notify(message){status.textContent=message;clearTimeout(statusTimer);statusTimer=setTimeout(()=>{status.textContent='';},5000);}
function track(name,data){if(typeof window.fbq==='function')window.fbq('trackCustom',name,data);}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
 const text=document.getElementById(button.dataset.copy).textContent;
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}else{const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();const copied=document.execCommand('copy');area.remove();if(!copied)throw new Error('copy failed');}notify('Đã sao chép. Mở Zalo và dán tin nhắn để gửi cho FTG.');}
 catch(error){notify('Chưa sao chép được. Bạn có thể chọn và sao chép trực tiếp phần tin nhắn phía trên.');}
}));
document.querySelectorAll('[data-contact]').forEach(link=>link.addEventListener('click',()=>{track('FunnelZaloClick',{entry:link.dataset.contact});}));

const registrationForm=document.getElementById('registration-form');
const statusEl=document.getElementById('registration-status');
const successEl=document.getElementById('registration-success');
const submitButton=registrationForm.querySelector('button[type="submit"]');

function showStatus(message,kind){
 statusEl.hidden=false;
 statusEl.textContent=message;
 statusEl.classList.toggle('is-error',kind==='error');
}

function showSuccess(){
  registrationForm.querySelectorAll('.registration-fields, .form-intro, .contact-consent, button[type="submit"]').forEach(el=>el.hidden=true);
  const formNote=registrationForm.querySelector(':scope > .note');
  if(formNote)formNote.hidden=true;
 statusEl.hidden=true;
 successEl.hidden=false;
 const group=document.getElementById('zalo-group-link');
 if(group){group.href=ZALO_GROUP;group.focus();}
 track('FunnelLeadSubmit',{content_name:'Zoom AI Agent miễn phí hằng tuần'});
}

registrationForm.addEventListener('submit',async event=>{
 event.preventDefault();
 if(successEl&&!successEl.hidden)return;
 const formData=new FormData(registrationForm);
 if(!formData.get('_honey'))formData.set('_honey','');
 formData.set('source','ftg-tech-bat-dau');
 formData.set('submitted_at_utc',new Date().toISOString());
 if(!registrationForm.reportValidity())return;
 submitButton.disabled=true;
 submitButton.textContent='ĐANG GỬI…';
 showStatus('Đang gửi yêu cầu nhận lịch Zoom.', 'info');
 try{
  const response=await fetch(REGISTRATION_ENDPOINT,{
   method:'POST',
   headers:{'Content-Type':'application/json','Accept':'application/json'},
   body:JSON.stringify(Object.fromEntries(formData.entries()))
  });
  const payload=await response.json().catch(()=>({ok:false}));
  if(!response.ok||!payload.ok)throw new Error(payload.error||'submit_failed');
  showSuccess();
 }catch(error){
  showStatus('Chưa gửi được. Kiểm tra kết nối rồi gửi lại, hoặc nhắn Zalo 0918 212 460.', 'error');
  submitButton.disabled=false;
  submitButton.textContent='GỬI YÊU CẦU NHẬN LỊCH ZOOM ↗';
 }
});
