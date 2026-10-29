
import React, { useEffect, useMemo, useState, useRef } from "react";
import { ShoppingBag, Search, Plus, Minus, Trash2, ArrowRight, PackageCheck, Truck, ShieldCheck, RefreshCw } from "lucide-react";import {api} from './api.js';
const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
const emoji={Electronics:'🎧',Fashion:'👟',Home:'🪴',Sports:'🏏',Books:'📚'};
export default function App(){const [products,setProducts]=useState([]),[categories,setCategories]=useState(['All']),[category,setCategory]=useState('All'),[query,setQuery]=useState(''),[cart,setCart]=useState([]),[page,setPage]=useState('shop'),[showCart,setShowCart]=useState(false),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState(''),[order,setOrder]=useState(null);
async function load(){setLoading(true);setError('');try{const [p,c]=await Promise.all([api.products(query,category),api.categories()]);setProducts(p);setCategories(['All',...c]);}catch(e){setError(e.message)}finally{setLoading(false)}}
useEffect(()=>{const t=setTimeout(load,250);return()=>clearTimeout(t)},[query,category]);
const count=useMemo(()=>cart.reduce((s,x)=>s+x.quantity,0),[cart]),total=useMemo(()=>cart.reduce((s,x)=>s+x.price*x.quantity,0),[cart]);
function add(p){setCart(old=>{const found=old.find(x=>x.id===p.id);return found?old.map(x=>x.id===p.id?{...x,quantity:Math.min(x.quantity+1,p.stock)}:x):[...old,{...p,quantity:1}]});setNotice(p.name+' added to cart');setTimeout(()=>setNotice(''),1800)}
function quantity(id,n){setCart(old=>old.map(x=>x.id===id?{...x,quantity:Math.min(n,x.stock)}:x).filter(x=>x.quantity>0))}
async function submit(e){e.preventDefault();const f=new FormData(e.currentTarget);const customerName=String(f.get('name')).trim(),email=String(f.get('email')).trim(),deliveryAddress=String(f.get('address')).trim();if(customerName.length<2||!/^\S+@\S+\.\S+$/.test(email)||deliveryAddress.length<5){setError('Please enter a valid name, email, and delivery address.');return}setBusy(true);setError('');try{const o=await api.createOrder({customerName,email,deliveryAddress,items:cart.map(x=>({productId:x.id,quantity:x.quantity}))});setOrder(o);setCart([]);setShowCart(false);setPage('success');await load()}catch(err){setError(err.message)}finally{setBusy(false)}}
return <div className="shell"><header className="nav"><button className="brand" onClick={()=>setPage('shop')}><span className="brandIcon"><ShoppingBag/></span>Swift<span>Cart</span></button><label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/></label><button className="cartBtn" onClick={()=>setShowCart(true)}><ShoppingBag size={18}/> Cart <b>{count}</b></button></header>
{page==='privacy'?<main className="wrap legal"><button className="link" onClick={()=>setPage('shop')}>← Back to shop</button><p className="eyebrow">SWIFTCART</p><h1>Privacy Policy</h1><p>This educational demo stores name, email, delivery address, and order details when a demo order is submitted. This data is used to create the order in the local demo database.</p><p>Do not enter real sensitive information. Before public deployment, add appropriate access controls, data retention practices, a real contact method, and a policy matching applicable law.</p></main>:page==='checkout'?<main className="wrap checkout"><button className="link" onClick={()=>setPage('shop')}>← Continue shopping</button><div className="checkoutGrid"><form className="card form" onSubmit={submit}><p className="eyebrow">ALMOST THERE</p><h1>Delivery details</h1><label>Full name<input name="name" minLength="2" required/></label><label>Email address<input name="email" type="email" required/></label><label>
  Delivery address
  <textarea
    ref={addressRef}
    name="address"
    minLength="5"
    required
    rows="3"
    placeholder="House/flat, street, area, city, state and PIN code"
  />
</label>

<button
  type="button"
  className="locationButton"
  onClick={useMyLocation}
  disabled={locationLoading}
>
  {locationLoading ? "Getting location..." : "Use my location"}
</button>
{locationError && (
  <p className="error" role="alert">{locationError}</p>
)}

{error && (
  <p className="error">{error}</p>
)}<button className="primary" disabled={busy||!cart.length}>{busy?'Placing order...':'Place demo order'}</button><small>Demo only — no payment is collected.</small></form><aside className="card summary"><h3>Order summary</h3>{cart.map(x=><p key={x.id}>{x.name} × {x.quantity}<b>{money(x.price*x.quantity)}</b></p>)}<hr/><h3>Total <b>{money(total)}</b></h3><p className="muted">The backend calculates the final total using current product prices.</p></aside></div></main>:page==='success'&&order?<main className="wrap success"><div className="check">✓</div><p className="eyebrow">ORDER CONFIRMED</p><h1>Thanks, {order.customerName}!</h1><p>Your demo order has been created.</p><div className="ticket"><p>Order number <b>#{order.id}</b></p><p>Status <b>{order.status}</b></p><p>Total <b>{money(order.totalAmount)}</b></p></div><p className="muted">This is not a paid order.</p><button className="primary" onClick={()=>setPage('shop')}>Continue shopping <ArrowRight size={17}/></button></main>:<><main><section className="hero wrap"><div><p className="eyebrow">SMARTER WAY TO SHOP</p><h1>Find your next<br/><span>favourite thing.</span></h1><p>Everyday essentials, useful tech and little upgrades for work, home and play.</p><button className="primary" onClick={()=>document.getElementById('products').scrollIntoView({behavior:'smooth'})}>Explore products <ArrowRight size={17}/></button><div className="trust"><span><ShieldCheck size={15}/> Server-checked orders</span><span><Truck size={15}/> Delivery-ready design</span></div></div><div className="heroArt"><div className="bubble">🎧 Everyday tech</div><div className="bagArt">🛍️</div><div className="bubble bottom">👟 Fresh picks</div></div></section><section className="benefits wrap"><div><Truck/><span><b>Delivery information</b><small>Order details in one place</small></span></div><div><ShieldCheck/><span><b>Safer by design</b><small>Backend validates totals</small></span></div><div><PackageCheck/><span><b>Easy shopping</b><small>Search and category filters</small></span></div></section><section id="products" className="products wrap"><div className="sectionHead"><div><p className="eyebrow">THE COLLECTION</p><h2>Popular right now</h2><p>Useful finds for everyday life.</p></div><span>{products.length} products</span></div><div className="filters">{categories.map(c=><button className={c===category?'active':''} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div>{error&&<div className="error">{error} <button onClick={load}><RefreshCw size={14}/> Retry</button></div>}{loading?<p className="loading">Loading products…</p>:products.length===0?<div className="empty"><h3>No products found</h3><button className="link" onClick={()=>{setQuery('');setCategory('All')}}>Clear filters</button></div>:<div className="grid">{products.map(p=><article className="product" key={p.id}><div className={'art '+p.category.toLowerCase()}><span>{emoji[p.category]||'🛍️'}</span><small>{p.category}</small></div><div className="productBody"><h3>{p.name}</h3><p>{p.description}</p><small className="stock">{p.stock>0?`${p.stock} in stock`:'Out of stock'}</small>

<div className="productFoot">
  <b>{money(p.price)}</b>
  <div className="productActions">
    <button
      type="button"
      onClick={() => add(p)}
      disabled={!p.stock}
    >
      + Add
    </button>

    <button
      type="button"
      className="buyNow"
      disabled={!p.stock}
      onClick={() => {
        setCart([{ ...p, quantity: 1 }]);
        setError("");
        setShowCart(false);
        setPage("checkout");
      }}
    >
      Buy Now
    </button>
  </div>
</div>
</div>

</article>
)}
</div>}
</section>
</main>
</>}


<footer className="footer"><div><b>Swift<span>Cart</span></b><p>Little things. Better everyday.</p></div><button className="link" onClick={()=>setPage('privacy')}>Privacy policy</button><small>Demo project · No real payments</small></footer>{showCart&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setShowCart(false)}}><aside className="cartPanel"><div className="panelHead"><div><p className="eyebrow">YOUR SELECTION</p><h2>Shopping cart</h2></div><button onClick={()=>setShowCart(false)}>✕</button></div>{!cart.length?<div className="empty"><span>🛒</span><h3>Your cart is empty</h3><p>Add products to get started.</p></div>:<><div className="cartItems">{cart.map(x=><div className="cartItem" key={x.id}><div className="cartEmoji">{emoji[x.category]||'🛍️'}</div><div className="cartMain"><b>{x.name}</b><small>{money(x.price)}</small><div className="qty"><button onClick={()=>quantity(x.id,x.quantity-1)}><Minus size={13}/></button><span>{x.quantity}</span><button disabled={x.quantity>=x.stock} onClick={()=>quantity(x.id,x.quantity+1)}><Plus size={13}/></button><button onClick={()=>quantity(x.id,0)}><Trash2 size={13}/></button></div></div><b>{money(x.price*x.quantity)}</b></div>)}</div><div className="cartTotal"><p>Subtotal <b>{money(total)}</b></p><button className="primary" onClick={()=>{setShowCart(false);setPage('checkout')}}>Continue to checkout</button><small>Demo checkout only. No payment is collected.</small></div></>}</aside></div>}{notice && (
  <div className="toast" role="status" aria-live="polite">
    <span className="toastIcon" aria-hidden="true">✓</span>
    <span>{notice}</span>
  </div>

)}</div>
}
