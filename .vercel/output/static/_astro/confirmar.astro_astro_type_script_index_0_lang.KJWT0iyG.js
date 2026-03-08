import{s as u}from"./supabase.tbwPPwye.js";document.addEventListener("DOMContentLoaded",async()=>{const s=document.getElementById("clientName"),d=document.getElementById("clientAvatar"),p=document.getElementById("orderItems"),f=document.getElementById("totalDisplay"),y=document.getElementById("subtotalDisplay"),r=document.getElementById("confirmBtn"),g=document.getElementById("loadingOverlay"),h=localStorage.getItem("active_customer");let n=[];try{n=JSON.parse(localStorage.getItem("cart_data")||"[]")}catch(t){console.error("Error parsing cart",t)}if(n.length===0){alert("No hay productos en el carrito."),window.location.href="/vendedores";return}let a={id:"anon",nombre_comercial:"Cliente General",telefono:""};if(h){const t=JSON.parse(h),o=t.nombre_comercial||t.nombre||"Cliente";a={...t,nombre_comercial:o},s&&(s.textContent=o),d&&(d.textContent=o.charAt(0).toUpperCase())}else s&&(s.textContent="Cliente General (Mostrador)"),d&&(d.textContent="G");let c=0;p&&(p.innerHTML=""),n.forEach(t=>{c+=t.price*t.qty;const o=document.createElement("div");o.className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm",o.innerHTML=`
                <div class="flex items-center gap-3">
                    <div class="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center text-xs text-gray-500 font-bold">x${t.qty}</div>
                    <div>
                        <p class="font-bold text-gray-900 text-sm">${t.name}</p>
                        <p class="text-xs text-gray-400">$${t.price.toLocaleString()} un.</p>
                    </div>
                </div>
                <span class="font-bold text-gray-900">$${(t.price*t.qty).toLocaleString()}</span>
            `,p?.appendChild(o)}),f&&(f.textContent=`$${c.toLocaleString("es-CO")}`),y&&(y.textContent=`$${c.toLocaleString("es-CO")}`),r?.addEventListener("click",async()=>{if(!(!r||r.disabled)){g?.classList.remove("hidden"),r.disabled=!0;try{const t=n.map(e=>e.id),{data:o,error:E}=await u.from("productos").select("id, nombre, stock_cantidad").in("id",t);if(E)throw new Error("Error verificando stock: "+E.message);const I=new Map(o?.map(e=>[e.id,e])||[]),i=[];if(n.forEach(e=>{const m=I.get(e.id);m?e.qty>m.stock_cantidad&&i.push(`¡Stock Insuficiente!Solo quedan ${m.stock_cantidad} uds de ${m.nombre} (Pides: ${e.qty})`):i.push(`Producto no encontrado: ${e.name}`)}),i.length>0)throw new Error(i.join(`
`));const x=2026,L=Math.floor(1e3+Math.random()*9e3),l=`AM-${x}-${L}`,B=document.getElementById("meta-data")?.getAttribute("data-vendedor-id");console.table(n);const k=n.map(e=>({id:e.id,cantidad:e.qty,precio:e.price})),{data:$,error:w}=await u.rpc("crear_pedido_con_stock",{p_cliente_nombre:a.nombre_comercial,p_cliente_id:a.id!=="anon"?a.id:null,p_tag_rastreo:l,p_total:c,p_detalles:k,p_vendedor_id:B});if(w)throw new Error(w.message);if(!$.success)throw new Error($.error||"Error desconocido en transacción");await u.from("pedidos").update({estado:"Preparación"}).eq("tag_rastreo",l),localStorage.removeItem("cart_data");let v="";if(a.telefono){const e=a.telefono.replace(/\D/g,"");e.length>0&&(v=e.startsWith("57")?e:"57"+e)}const M=`${window.location.origin}/rastreo/${l}`,S=n.map(e=>`- ${e.qty}x ${e.name} ($${(e.price*e.qty).toLocaleString()})`).join(`
`),q=`*Pedido Nuevo - Amasar Go* 🚀

*Cliente:* ${a.nombre_comercial}
*Código de Rastreo:* ${l}

${S}

*Total: $${c.toLocaleString()}*

Sigue tu pedido aquí: ${M}`,D=`https://wa.me/${v}?text=${encodeURIComponent(q)}`,_=document.getElementById("whatsappBtn"),b=document.getElementById("homeBtn"),N=document.getElementById("successModal"),C=document.getElementById("successModalContent");_&&(_.onclick=()=>window.open(D,"_blank")),b&&(b.onclick=()=>{window.location.href="/vendedores?success=order_created"}),g?.classList.add("hidden"),N?.classList.remove("hidden"),setTimeout(()=>{C?.classList.remove("scale-95","opacity-0"),C?.classList.add("scale-100","opacity-100")},10)}catch(t){console.error("Critical Purchase Error:",t),alert("Error procesando el pedido: "+t.message),g?.classList.add("hidden"),r.disabled=!1}}})});
