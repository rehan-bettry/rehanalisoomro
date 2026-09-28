const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
window.addEventListener("load",()=>setTimeout(()=>$("#loader").style.display="none",500));

$("#menuBtn").onclick=()=>$("#navlinks").classList.toggle("open");
$$(".navlinks a").forEach(a=>a.onclick=()=>$("#navlinks").classList.remove("open"));

$("#darkBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.theme=document.body.classList.contains("dark")?"dark":"light";$("#darkBtn").textContent=document.body.classList.contains("dark")?"☀️":"🌙"};
if(localStorage.theme==="dark"){document.body.classList.add("dark");$("#darkBtn").textContent="☀️"}

let urdu=false;
$("#langBtn").onclick=()=>{
  urdu=!urdu; document.documentElement.lang=urdu?"ur":"en"; document.documentElement.dir=urdu?"rtl":"ltr";
  $("#langBtn").textContent=urdu?"English":"اردو";
  $$("[data-en]").forEach(e=>e.textContent=urdu?e.dataset.ur:e.dataset.en);
  toast(urdu?"زبان اردو کر دی گئی۔":"Language changed to English.");
};

const notices=[
 ["Admission Open","Admissions for the new session are now open."],
 ["Holiday Notice","Please check the school office for the latest holiday schedule."],
 ["Parent Meeting","Parent-Teacher Meeting is scheduled for October 22."]
];
$("#notices").innerHTML=notices.map(n=>`<div class="notice"><b>NOTICE</b><span><strong>${n[0]}</strong><br>${n[1]}</span></div>`).join("");

$$(".counter").forEach(el=>{
 let end=+el.dataset.target, n=0, step=Math.max(1,Math.ceil(end/60));
 let t=setInterval(()=>{n+=step;if(n>=end){n=end;clearInterval(t)}el.textContent=n},25);
});

$$(".filters button").forEach(btn=>btn.onclick=()=>{
 $$(".filters button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 const f=btn.dataset.filter;
 $$(".gallery-item").forEach(x=>x.style.display=f==="all"||x.classList.contains(f)?"flex":"none");
});

function toast(msg){$("#toast").textContent=msg;$("#toast").style.display="block";setTimeout(()=>$("#toast").style.display="none",2600)}
function openLogin(){$("#loginModal").classList.add("show")}
function closeLogin(){$("#loginModal").classList.remove("show")}
function closeDashboard(){$("#dashboardModal").classList.remove("show")}

$("#admissionForm").onsubmit=e=>{
 e.preventDefault(); const data=Object.fromEntries(new FormData(e.target));
 const old=JSON.parse(localStorage.admissions||"[]");old.push({...data,date:new Date().toLocaleString()});localStorage.admissions=JSON.stringify(old);
 e.target.reset();toast("Admission application saved successfully.");
};
$("#contactForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Message sent successfully.");};

$("#loginForm").onsubmit=e=>{
 e.preventDefault(); const role=$("#role").value, user=$("#username").value;
 localStorage.lastLogin=JSON.stringify({role,user,date:new Date().toISOString()}); closeLogin(); showDashboard(role,user);
};
function showDashboard(role,user){
 const names={student:"Student",parent:"Parent",teacher:"Teacher",admin:"Admin"};
 const common={
 student:[["Attendance","92%"],["Exam Result","A Grade"],["Homework","4 pending"],["Fee Status","Paid"]],
 parent:[["Child Attendance","92%"],["Performance","A Grade"],["Fee Status","Paid"],["PTM","Request available"]],
 teacher:[["My Classes","6"],["Attendance","Mark now"],["Assignments","12"],["Students","184"]],
 admin:[["Students","1,200"],["Teachers","75"],["Admissions","32"],["Notices","8"]]
 }[role];
 $("#dashboardContent").innerHTML=`<div class="section-head left"><span>${names[role].toUpperCase()} PORTAL</span><h2>Welcome, ${user}</h2><p>Demo frontend dashboard</p></div><div class="dash-cards">${common.map(x=>`<div class="dash-card"><small>${x[0]}</small><h3>${x[1]}</h3></div>`).join("")}</div><br><button class="btn btn-primary" onclick="toast('Demo action completed.')">Open Portal</button>`;
 $("#dashboardModal").classList.add("show");
}

$("#backTop").onclick=()=>scrollTo({top:0,behavior:"smooth"});
window.onscroll=()=>$("#backTop").style.display=scrollY>500?"grid":"none";
