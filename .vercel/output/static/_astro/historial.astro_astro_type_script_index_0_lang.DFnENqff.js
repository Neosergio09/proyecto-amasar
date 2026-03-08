import{s as m}from"./supabase.tbwPPwye.js";document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".resend-wa").forEach(e=>{e.addEventListener("click",()=>{const r=e.getAttribute("data-phone")||"",n=e.getAttribute("data-tag"),u=e.getAttribute("data-client"),t=JSON.parse(e.getAttribute("data-items")||"[]"),c=parseInt(e.getAttribute("data-total")||"0"),s=r.replace(/\D/g,""),a=s.length>0?s.startsWith("57")?s:"57"+s:"";if(!a){alert("Este cliente no tiene un número de teléfono válido registrado.");return}const o=`${window.location.origin}/rastreo/${n}`,i=t.map(d=>`- ${d.qty}x ${d.visualName||d.name} ($${(d.price*d.qty).toLocaleString()})`).join(`
`),l=`*Pedido Nuevo - Amasar Go* 🚀

*Cliente:* ${u}
*Código de Rastreo:* ${n}

${i}

*Total: $${c.toLocaleString()}*

Sigue tu pedido aquí: ${o}`,p=`https://wa.me/${a}?text=${encodeURIComponent(l)}`;window.open(p,"_blank")})});const q=document.getElementById("editModal"),f=document.getElementById("modalContent"),y=document.getElementById("saveEditBtn");let w=null,g=[];document.querySelectorAll(".edit-order").forEach(e=>{e.addEventListener("click",()=>{const r=e.getAttribute("data-id"),n=e.getAttribute("data-detalles");if(!(!r||!n)){if(w=r,g=JSON.parse(n),f){const u=g.map(t=>({...t,qty:t.cantidad??t.qty}));f.innerHTML=u.map((t,c)=>`
                        <div class="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 item-row" data-idx="${c}">
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-gray-900 truncate text-sm">${t.visualName||t.name}</p>
                                <p class="text-xs text-gray-500">$${t.precio||t.price}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <input type="number" min="0" value="${t.qty}" class="qty-input w-16 h-10 rounded-xl border-gray-200 text-center font-bold text-sm" />
                            </div>
                        </div>
                    `).join("")}q.showModal()}})}),y?.addEventListener("click",async()=>{if(!w||!f)return;const e=y.textContent;y.textContent="Guardando...",y.disabled=!0;try{const r=f.querySelectorAll(".qty-input"),n=g.map((a,o)=>{const i=r[o],l=parseInt(i.value)||0;return{...a,qty:l,cantidad:l}}),u=n.map(async(a,o)=>{const i=g[o],l=i.cantidad??i.qty??0,p=a.qty-l;if(p>0){const{data:d}=await m.from("productos").select("stock_cantidad, nombre").eq("id",a.id).single();if(d&&p>d.stock_cantidad)throw new Error(`¡Stock insuficiente para ${d.nombre}! Solo hay ${d.stock_cantidad} uds disponibles.`)}});await Promise.all(u);const t=n.map(async(a,o)=>{const i=g[o],l=i.cantidad??i.qty??0,p=a.qty-l;if(p!==0){const{data:d}=await m.from("productos").select("stock_cantidad").eq("id",a.id).single();d&&await m.from("productos").update({stock_cantidad:d.stock_cantidad-p}).eq("id",a.id)}});await Promise.all(t);const c=n.reduce((a,o)=>a+o.qty*(o.precio||o.price),0),{error:s}=await m.from("pedidos").update({detalles:n,total:c}).eq("id",w);if(s)throw s;window.location.reload()}catch(r){alert("Error: "+r.message),y.textContent=e,y.disabled=!1}}),document.querySelectorAll(".cancel-order").forEach(e=>{e.addEventListener("click",async()=>{const r=e.getAttribute("data-id"),n=e.getAttribute("data-detalles");if(!r||!confirm("¿Cancelar pedido? Se restaurará el stock."))return;const u=JSON.parse(n||"[]");try{const t=u.map(async s=>{const a=s.cantidad??s.qty??0;if(a===0)return;const{data:o}=await m.from("productos").select("stock_cantidad").eq("id",s.id).single();o&&await m.from("productos").update({stock_cantidad:o.stock_cantidad+a}).eq("id",s.id)});await Promise.all(t);const{error:c}=await m.from("pedidos").update({estado:"Cancelado"}).eq("id",r);if(c)throw c;window.location.reload()}catch(t){alert("Error: "+t.message)}})})});
