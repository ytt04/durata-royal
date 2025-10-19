// backend/init-db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbPath = path.join(__dirname, "database.sqlite");

// Si existe BD vieja, la eliminamos para empezar limpio
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log("🗑 Base de datos anterior eliminada");
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Crear tablas
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    images TEXT
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    total REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);



  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`);

  // Insertar productos con múltiples imágenes (guardadas como JSON)
  const stmt = db.prepare("INSERT INTO products (name, description, price, images) VALUES (?, ?, ?, ?)");

  const products = [
    {
      name: "Perfume ARABE ORIENTICA",
      description: "Amber Rouge.",
      price: 120.000,
      images: [
        "https://static.dafiti.com.co/p/al-haramain-8929-0406012-1-zoom.jpg",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/o/r/orientica_amber_rouge_for_woman_edp_80ml_2.png" 
      ]
    },
    {
      name: "Perfume ARABE ORIENTICA",
      description: " Royal Amber.",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/products/OrienticaRoyalAmber.jpg?v=1650574772",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbvC8TGFMPpjsrMCbELvJuXXYGLKro1yNxNEzJNbkgwPoN6od_wiO_1JAiwP55D8b__8&usqp=CAU"
      ]
    },
    {
      name: "Perfume ARABE ORIENTICA",
      description: " Velvet Gold",
      price: 120.000,
      images: [
        "https://cdn.valmara.co/54128-large_default/perfume-unisex-orientica-velvet-gold-de-al-haramain-80-ml-edp.webp",
        "https://altaperfumeriashop.com/cdn/shop/files/ORIENTICAVELVETGOLD.jpg?v=1709009611",
        
      ]
    },
    {
      name: "Perfume ARABE ORIENTICA",
      description: " Amber Noir.",
      price: 120.000,
      images: [
        "https://cdn5.coppel.com/mkp/10303279-1.jpg",
        "https://ss701.liverpool.com.mx/xl/1141418340.jpg",
       
      ]
    },
    {
      name: "Perfume MOSCHINO",
      description: " TOY Boy.",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/products/MoschinoToyBoy.webp?v=1650422113",
        "https://perfumeriasvalencia.com/static/imagenes/productos/shop_2022/phpD5SRXL_659.webp",
        
      ]
    },
    {
      name: "Perfume MOSCHINO",
      description: " TOY 2 PEARL.",
      price: 120.000,
      images: [
        "https://static.wixstatic.com/media/4ccbae_a5fed166eea04130ac5f77b9b10ff9f5~mv2.jpg/v1/fill/w_520,h_578,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4ccbae_a5fed166eea04130ac5f77b9b10ff9f5~mv2.jpg",
        "https://m.media-amazon.com/images/I/61YVE0H8q0L._UF1000,1000_QL80_.jpg"
      ]
    },
    {
      name: "Perfume MOSCHINO",
      description: " TOY 2 Mujer.",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/moschino-toy-2-perfumes-503.webp?v=1713416484",
        "https://i5.walmartimages.com/asr/d3042d19-1286-427f-a5ca-e8cc9ae4f3a9.d6bb2c417e771ed49ba0b628f1ea7b72.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    
      ]
    },
    {
      name: "Perfume MOSCHINO",
      description: " Toy 2 Bubble Gum Mujer.",
      price: 120.000,
      images: [
        "https://facescr.vtexassets.com/arquivos/ids/202440-800-auto?v=638840382798130000&width=800&height=auto&aspect=true",
        "https://media.falabella.com/falabellaCO/13877483_1/w=1500,h=1500,fit=pad",
    
      ]
    },
    {
      name: "Perfume ARABE LATTAFA",
      description: "BADEE-AL-OUD-BLACK.",
      price: 120.000,
      images: [
        "https://cdn.shopify.com/s/files/1/0656/8348/8983/files/LATTAFA--BADEE-AL-OUD-BLACK-100ML-cosmeticos-en-linea.jpg?v=1722026440 ",
        "https://www.antioquiaventas.com/cdn/shop/files/Perfume-Lattafa-Oud-for-Glory-1.jpg?v=1731593970",
        
      ]
    }, {
      name: "Perfume ARABE LATTAFA",
      description: " Bade'e Al Oud Amethyst Unisex",
      price: 120.000,
      images: [
        "https://agaval.vtexassets.com/arquivos/ids/2578271/image-21fb5fd4adba457bbaf6222f70baf7c0.jpg?v=638811237774530000",
        "https://upperprestige.com/cdn/shop/files/1_48642148-1d40-4e91-ad38-24ae7e58fe32.png?v=1752175416",
    
      ]
    },
    {
      name: "Perfume ARABE LATTAFA",
      description: " Honor & Glory",
      price: 120.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2023/09/perfume18-17.jpg",
        "https://houseofbeauty.com.co/cdn/shop/files/EMPERAMBERMODA100MLSPREDP_1_600x.png?v=1749755976",
        
      ]
    },
    {
      name: "Perfume ARABE LATTAFA",
      description: "BADEE AL OUD SUBLIME UNISEX",
      price: 120.000,
      images: [
        "https://cdnx.jumpseller.com/sairam/image/36974451/thumb/1500/1500?1687978023",
        "https://prebel.vtexassets.com/arquivos/ids/185502-800-auto?v=638567594586000000&width=800&height=auto&aspect=truee",
        
      ]
    },
    {
      name: "Perfume ARABE LATTAFA",
      description: "Yara",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_886656-MCO84039126849_042025-O.webp",
        "https://media.falabella.com/falabellaCO/123834196_01/w=800,h=800,fit=pad",
    
      ]
    },
    {
      name: "Perfume ARABE LATTAFA",
      description: "Yara Candy",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/files/Lattafa-Yara-Candy.jpg?v=1727393152",
        "https://i5.walmartimages.com/asr/cd1cc42d-bb0f-4be3-acb2-adce40dc86f2.d30a07c6339893bd4fde0c3df6e550df.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        
      ]
    },
    {
      name: "Perfume ARABE LATTAFA",
      description: "Yara Tous",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/files/Lattafa-Yara-Tous.png?v=1697036194",
        "https://m.media-amazon.com/images/I/41dETcvyQkL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume ARABE lATTAFA",
      description: "asad.",
      price: 120.000,
      images: [
        "https://cdn.notinoimg.com/detail_main_lq/lattafa/6291108735411_02-o/asad___220927.jpg",
        "https://cdn.awsli.com.br/2667/2667788/produto/289909056/asad-19wfcg824h.jpg",
        
      ]
    },
    {
      name: "Perfume ARABE LATTAFA ",
      description: "Asad Bourbon.",
      price: 120.000,
      images: [
        "https://perfumescolombia.com.co/cdn/shop/files/lattafa-asad-bourbon-11-premium-edp-100ml-7779634.webp?v=1751883967",
        "https://telotengocompany.com/cdn/shop/files/50_cc97c36b-00c9-4dfc-aeb0-9c0dc2f106d8.webp?v=1747829250&width=1946",
        
      ]
    },
    {
      name: "Perfume VERSACE",
      description: "Eros Hombre.",
      price: 120.000,
      images: [
        "https://static.wixstatic.com/media/7e4077_b4bc66e09f6b41b5a2a2ea6511f39914~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
        "https://media.falabella.com/falabellaCO/9761893_1/w=800,h=800,fit=pad",
        
      ]
    },
     {
      name: "Perfume VERSACE",
      description: "EROS FLAME.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_752694-MLA90645260773_082025-O.webp",
        "https://media.falabella.com/falabellaCO/3941400_1/w=1500,h=1500,fit=pad" 
      ]
    },
    {
      name: "Perfume VERSACE",
      description: "EROS ENERGY.",
      price: 120.000,
      images: [
        "https://static.wixstatic.com/media/4ccbae_ec988837a90f4d1099456404ad02dac4~mv2.jpg/v1/fill/w_520,h_582,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4ccbae_ec988837a90f4d1099456404ad02dac4~mv2.jpg",
        "https://www.lijepa.hr/data/cache/thumb_min500_max1000-min500_max1000-12/products/495131/1734010088/versace-eros-energy-parfemska-voda-za-muskarce-50-ml-605580.jpg"
      ]
    },
    {
      name: "Perfume VERSACE",
      description: " EROS NAJIM",
      price: 120.000,
      images: [
        "https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw5e7b8290/original/90_R740310-R100MLS_RNUL_22_Eros~Najim~Parfum~100~ml-Fragrances~~Body~Care-Versace-online-store_0_0.jpg?sw=850&q=85&strip=true",
        "https://www.perfumesbogota.com.co/cdn/shop/files/perfume-versace-eros-najim-parfum-100ml-hombre-1494336_2048x.png?v=1758668573",
        
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: " Invictus Victory.",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/invictus-victory-extreme-paco-rabanne-100ml-perfumes-712.webp?v=1713419209",
        "https://cdn.notinoimg.com/detail_main_lq/paco-rabanne/3349668614523_01-o/invictus-victory-elixir___250428.jpg",
       
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: " Invictus Victory Elixir.",
      price: 120.000,
      images: [
        "https://f.fcdn.app/imgs/7a4928/electroventas.com.uy/elecuy/ce5b/original/catalogo/VIE65188729_VIE65188729_1/2000-2000/perfume-paco-rabanne-invictus-victory-elixir-edp-50ml-perfume-paco-rabanne-invictus-victory-elixir-edp-50ml.jpg",
        "https://perfumeriasvalencia.com/static/imagenes/productos/shop_2022/phpD5SRXL_659.webp",
        
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "INVICTUS.",
      price: 120.000,
      images: [
        "https://compras.macedonia.com.py/wp-content/uploads/2023/05/3883737.png",
        "https://cdn5.coppel.com/pr/7160702-2.jpg?iresize=width:400,height:320"
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "ONE Million.",
      price: 120.000,
      images: [
        "https://cdn.valmara.co/51986-large_default/perfume-para-hombre-1-million-parfum-de-paco-rabanne-100-ml.webp",
        "https://essentia.com.do/wp-content/uploads/2024/02/Paco-Rabanne-1-Million.png",
    
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: " Invictus Legend.",
      price: 120.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/invictuslegend100ml.jpg?v=1717780825&width=416",
        "https://perfumes.ec/cdn/shop/files/PacoRabanneInvictusLegend100ml_7b4fd5a4-5b54-4c32-8b8a-65336fa04a3d.png?v=1715727101",
    
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: " Pure Xs.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_Q_NP_877333-MLU72648381204_112023-O.webp ",
        "https://media.falabella.com/falabellaCO/8077184_1/w=1500,h=1500,fit=pad",
        
      ]
    }, {
      name: "Perfume PACO RABANNE",
      description: "Olympéa Legend",
      price: 120.000,
      images: [
        "https://www.abc.cl/dw/image/v2/BCPP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw49175f39/images/large/24920798.jpg?sw=1200&sh=1200&sm=fit",
        "https://i5.walmartimages.com/asr/9df81be2-8980-47a9-9b94-e2a10e169e20.7f52945e149f925bf6f6c2435d9695fb.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Hombre Phantom",
      price:120.000,
      images: [
        "https://media.falabella.com/falabellaCO/18352389_2/w=800,h=800,fit=pad",
        "https://media.falabella.com/falabellaCO/18352389_1/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Phantom Night",
      price: 120.000,
      images: [
        "https://yauras.cl/cdn/shop/files/CopiadeCopiadeAntonioBanderasMediterraneo_6_dd2ceba0-e217-4adb-92d5-1f8fbeb42f2c_700x700.jpg?v=1740058755",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/p/a/paco_rabanne_phantom_parfum_100ml.jpg",
        
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Phantom Intense",
      price: 120.000,
      images: [
        "https://www.tiendasekono.com/media/catalog/product/4/3/4360957.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=1080&width=1080&canvas=1080:1080",
        "https://mundoreloj.com.co/wp-content/uploads/2024/05/Paco-Rabanne-Phantom-Intense-02.jpg",
    
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Phantom Legion",
      price: 120.000,
      images: [
        "https://cazanovaonline.mx/cdn/shop/products/phantom-legion-paco-rabanne-eau-de-toilette-spray-100ml.jpg?v=1673397641",
        "https://http2.mlstatic.com/D_NQ_NP_875484-MLA51716157649_092022-O.webp",
        
      ]
    },
    {
      name: "Perfume MONTALE PARIS",
      description: "Oud Damascus",
      price: 130.000,
      images: [
        "https://perfumeriacristlaurent.com/wp-content/uploads/2025/09/Perfume-Montale-Oud-Damascus-100ml-Edp-Unisex.webp",
        "https://m.media-amazon.com/images/I/71fJIB2StlL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume MONTALE PARIS",
      description: "Arabians Tonka.",
      price: 130.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_904499-MCO49040621580_022022-O.webp",
        "https://fraganciascolombia.com/cdn/shop/files/arabians-tonka.jpg?v=1746648497",
        
      ]
    },
    {
      name: "Perfume MONTALE PARIS",
      description: "Dark Purple Ámbar Floral.",
      price: 130.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/montale-paris-intense-cafe-100-ml-perfumes-852.webp?v=1713418279",
        "https://ss701.liverpool.com.mx/xl/1148620632.jpg",
        
      ]
    },
    {
      name: "Perfume MONTALE PARIS",
      description: "Oud Tobacco.",
      price: 130.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_848966-MLU73881814405_012024-O.webp",
        "https://mainstreetmde.co/cdn/shop/products/OUDTOBACCO.jpg?v=1644166514",
        
      ]
    },
        {
      name: "Perfume MONTALE PARIS",
      description: "Starry Nights.",
      price: 130.000,
      images: [
        "https://mundoreloj.com.co/wp-content/uploads/2024/07/Montale-Starry-Nights-01.jpg.webp",
        "https://www.perfumeriamaiane.com/wp-content/uploads/2017/11/starry-nights-montale-paris.jpg" 
      ]
    },
    {
      name: "Perfume MONTALE PARIS",
      description: "So Iris Intense.",
      price: 130.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/montale-paris-day-dreams-100-ml-perfumes-689.webp?v=1713418161",
        "https://cdn.valmara.co/54075-large_default/perfumes-unisex-so-iris-intense-de-montale-100-ml-edp.webp"
      ]
    },
    {
      name: "Perfume MONTALE PARIS",
      description: "Agua De Perfume Oudrising Vapo",
      price: 130.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/montale-oudrising-eau-de-parfum-unisex___210702.webp?v=1717087694",
        "https://fimgs.net/mdimg/perfume/o.60402.jpg",
        
      ]
    },
    {
      name: "Perfume ARIANA GRANDE",
      description: "Cloud Pink.",
      price: 130.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2025/01/PERFUMES-76.png",
        "https://media.superdrug.com//medias/sys_master/prd-images/h8d/h23/11027028738078/prd-front-834196_600x600/prd-front-834196-600x600.jpg",
       
      ]
    },
    {
      name: "Perfume ARIANA GRANDE",
      description: "Cloud.",
      price: 130.000,
      images: [
        "https://kakaomarket.cr/wp-content/uploads/2023/08/INN020936-Perfume-Ariana-Grande-Cloud-EDP-100ml-Mujer.jpg",
        "https://media.falabella.com/falabellaCO/73141700_001/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume ARIANA GRANDE",
      description: "Cloud Intense.",
      price: 130.000,
      images: [
        "https://www.perfumisimo.cl/cdn/shop/files/ArianaGrandeCloud2.0Intenseedp100mlMujerf2.png?v=1725972134&width=800",
        "https://m.media-amazon.com/images/I/51jDz4w+j2L._UF1000,1000_QL80_.jpg"
      ]
    },
    {
      name: "Perfume ARIANA GRANDE",
      description: "Thank U Next.",
      price: 130.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-thank-u-next-ariana-g-eau-de-parfum-100ml-mujer-8977261_300x300.jpg?v=1758670033",
        "https://blushbarmx.vtexassets.com/arquivos/ids/182189/Diapositiva1.jpg?v=638866428765530000",
    
      ]
    },
    {
      name: "Perfume ARIANA GRANDE",
      description: "Thank U Next 2.0.",
      price: 130.000,
      images: [
        "https://perfumeriaonlinex.com/wp-content/uploads/2025/08/ChatGPT-Image-29-ago-2025-15_17_00.png",
        "https://http2.mlstatic.com/D_NQ_NP_831319-MLU74956682187_032024-O.webp",
    
      ]
    },
    {
      name: "Perfume BVLGARI",
      description: "Omnia Coral.",
      price: 120.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2023/10/perfume19-10-1.jpg",
        "https://www.druni.es/media/catalog/product/1/4/1446759.jpg",
        
      ]
    }, {
      name: "Perfume BVLGARI",
      description: "Omnia Paraiba",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_638760-MLA32688319780_102019-O.webp",
        "https://www.mundodosdecants.com.br/wp-content/uploads/2023/03/Bvlgari-Omnia-Paraiba.jpg",
    
      ]
    },
    {
      name: "Perfume BVLGARI",
      description: "Omnia Crystalline",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/files/Omnia-Crystalline_100-ml.jpg?v=1716332849",
        "https://emporiodutyfree.com/wp-content/uploads/2015/04/Perfume-Omnia-Crystalline-De-Bvlgari-Para-Mujer-B.jpg",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L 12. 12. Rouge",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_765007-MLU72737055602_112023-O.webp",
        "https://carulla.vtexassets.com/arquivos/ids/16488454/perfume-lacoste-l1212-rouge-men-100-ml-33oz.jpg?v=638566645352930000  ",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L 12. 12. Noir",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/81NtIVGuCVL._UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/5160P79qn4L._SL160_.jpg",
    
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "Blanc Para Hombre",
      price: 120.000,
      images: [
        "https://exitocol.vtexassets.com/arquivos/ids/23602604/perfume-lacoste-blanc-para-hombre.jpg?v=638563958196230000",
        "https://static.dafiti.com.co/p/lacoste-3573-8100981-2-zoom.jpg",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L.12.12 Magnetic Para Hombre",
      price: 120.000,
      images: [
        "https://cdn.valmara.co/56800-large_default/perfume-para-hombre-l-12-12-pour-lui-magnetic-eau-de-lacoste-100-ml.webp",
        "https://m.media-amazon.com/images/I/615s4MQbBrL._AC_SL1500_.jpg",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L.12.12. Vert Hombre.",
      price: 120.000,
      images: [

        "https://perfumeplanet.com.pa/cdn/shop/products/Agregame-al-carrito-soy-tu-perfume-ideal...-23_1024x1024_f15e4b06-a2b5-432d-a3fc-1123a4e8ed7d.webp?v=1660327826",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.11045.jpg",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: " L.12.12 Bleu Azu - L.",
      price: 120.000,
      images: [
        "https://www.lessenceperfumeria.com/cdn/shop/files/D_NQ_NP_2X_795702-MCO41297541232_032020-F.webp?v=1728356292",
        "https://fimgs.net/mdimg/perfume/social.11044.jpg",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L.12.12 Jaune Yellow.",
      price: 120.000,
      images: [
        "https://arome.mx/cdn/shop/files/perfume-lacoste-l-12-12-yellow-jaune-para-hombre-de-lacoste-edt-175ml-arome-mexico-1.jpg?v=1725553381&width=600",
        "https://d25-a.sdn.cz/d_25/c_img_G_EP/GBMBi89.jpeg?fl=res%2C350%2C350%2C1%2Cfff%7Cwebp%2C80",
        
      ]
    },
     {
      name: "Perfume LACOSTE",
      description: "L.12.12 Elle Sparkling Rose.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_690418-MLA92450579052_092025-O.webp",
        "https://opaque.vteximg.com.br/arquivos/ids/434376-450-450/LACO-05-000010.png?v=638581345475700000" 
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L.12.12 Blanc Eau Fraiche.",
      price: 120.000,
      images: [
       
        "https://i.ebayimg.com/thumbs/images/g/mhgAAeSwJXNoyFTE/s-l1200.jpg",
        "https://m.media-amazon.com/images/I/71rjHX88exL._UF1000,1000_QL80_.jpg",
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L.12.12 FRENCH PANACHE MUJER",
      price: 120.000,
      images: [
        "https://essenzaperfumes.cr/wp-content/uploads/2021/11/L12-PANACHE-by-Lacoste.jpg",
        "https://essenzaperfumes.cr/wp-content/uploads/2021/11/L12-PANACHE-by-Lacoste-2.jpg",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L.12.12 Pour Elle Magnetic.",
      price: 120.000,
      images: [
        "https://ikonico.com/wp-content/uploads/2025/06/5634383_2.jpg",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/8/2/82463507.png",
       
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: " L.12.12 Pour Elle Elegant para mujer.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_634772-MLA51505876225_092022-O.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5PikyD9zqQ0cQM92nHfrtgZRhNUSjZbD_Ai-NlkVLikfy3rBlSLqXP5uyr2XST7F5fk&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L.12.12 Rose Intense Edt.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_924707-MLU69749076669_062023-O.webp",
        "https://fimgs.net/mdimg/perfume/o.79345.jpg"
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: " Eau De Lacoste mujer.",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-eau-de-lacoste-eau-de-parfum-90ml-mujer-1095686_300x300.jpg?v=1758671935",
        "https://disfragancias.com/cdn/shop/products/Lacoste-eau-de-lacoste-2.jpg?v=1699805184",
    
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: " Touch Of Pink.",
      price: 120.000,
      images: [
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.2364.jpg",
        "https://dam.elcorteingles.es/producto/www-001016960213417-00.jpg?impolicy=Resize&width=967&height=1200",
    
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "BOTTLED HOMBRE EDP.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/61-hbyjutCL._SL1500_.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6ltAhbe18AJICZAj7dUU5qEjdW1pd_QfBTnwh2zs5nsrBXqgy-pq1eh7mKh-6fDH5SI&usqp=CAU",
        
      ]
    }, {
      name: "Perfume HUGO BOSS",
      description: "BOTTLED ELIXIR",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykGmsbQGahreQF6zRtFnXBPUMGwqot4FQnDUyBc0BJYMj37YJBqaM1cgNk8Xo1XDmN98&usqp=CAU",
        "https://cdn.palbincdn.com/users/13253/images/BOTTLED-ELIXIR-1693425901.jpg",
    
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Toilette",
      price: 120.000,
      images: [
        "https://media.falabella.com/falabellaCO/19504432_2/w=800,h=800,fit=pad",
        "https://http2.mlstatic.com/D_NQ_NP_999597-MLA46331922324_062021-O.webp",
        
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "The Scent",
      price: 120.000,
      images: [
        "https://images.deprati.com.ec/sys-master/images/h7c/ha6/12455555923998/17419274-0_product_515Wx772H",
        "https://ss701.liverpool.com.mx/xl/1071930726.jpg",
        
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: " Intense para hombre | Suburbia",
      price: 120.000,
      images: [
        "https://media.douglas.es/medias/R5ZZJ01158351-1-global.jpg?context=bWFzdGVyfGltYWdlc3wzMjEzNTd8aW1hZ2UvanBlZ3xhR1UzTDJnNU1pODJNelkwTURZd09UTTFOemcxTkM5U05WcGFTakF4TVRVNE16VXhYekZmWjJ4dlltRnNMbXB3Wnd8NWQ5YjYxMmViZjI1ODY1MTdhZjkxMjY2ZGNlOGM5NjQ2NGEzODY4MjlhY2I5YjZmODM0NzYzMWU2ODhlZmNmNA&grid=true",
        "https://ss881.suburbia.com.mx/xl/5010658685.jpg",
    
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Bottled Night",
      price: 120.000,
      images: [
        "https://fragancity.com/cdn/shop/products/HUGOBOSSNIGHT200ml_300x300.jpg?v=1602010832",
        "https://eclipseperfumes.cr/cdn/shop/files/375x500.8825.jpg?v=1687897273",
        
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Just Different Men",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7SlBxqFuxJrJpMaWeknE4I4JtxPooZwyn5cWNnk6tUHotbkbSXfwa4mEb0vrwiOS_gxI&usqp=CAU",
        "https://http2.mlstatic.com/D_NQ_NP_663192-MLV50510535046_062022-O.webp",
        
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Bottled Unlimited.",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-boss-unlimited-eau-de-toilette-200ml-hombre-7347347_1200x1200.jpg?v=1758672353",
        "https://fimgs.net/mdimg/perfume/o.22528.jpg",
        
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Iced Perfume for Men Eau De Toilette.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_Q_NP_768961-MLM49437526893_032022-O.webp",
        "https://media.falabella.com/falabellaCO/72728721_1/public?wid=200&hei=200&qlt=70&fmt=webp",
        
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Jeans Eau de Toilette.",
      price: 120.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2023/03/hugo-boss-jeans.jpg",
        "https://fimgs.net/mdimg/perfume/o.78426.jpg",
        
      ]
      
     },
    {
      name: "Perfume HUGO BOSS",
      description: "Bottled Pacific.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/71wda5ZhdkL._UF1000,1000_QL80_.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWBf49K-bMbcT-tZKXDutxxs6hf5Ats2JNbA&s"
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Bottled Bold Citrus",
      price: 120.000,
      images: [
        "https://media.falabella.com/falabellaCO/73326163_2/w=800,h=800,fit=pad",
        "https://media.falabella.com/falabellaCO/73326163_1/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "Very Good Girl.",
      price: 120.000,
      images: [
        "https://cdn.valmara.co/58395-large_default/perfume-para-dama-very-good-girl-carolina-herrera-80-ml-edp.webp",
        "https://media.falabella.com/falabellaCO/14117862_1/w=1500,h=1500,fit=pad",
       
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: " Ámbar Floral CH.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/51GZ5tHz3FL._SL1000_.jpg",
        "https://m.media-amazon.com/images/I/51qX68zaoYL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "GOOD GIRL BLUSH.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/61wLBqnPuPL._UF350,350_QL80_.jpg",
        "https://m.media-amazon.com/images/I/31TjotTKF5L._UF1000,1000_QL80_.jpg"
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "Good Girl Supreme.",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHz21eBK8_Xh5pGqDmhKjD-X14U7oYMCceBw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSseVLGzVRmAf1QWKSvEggLMoWn_bJDxOR7xg&s",
    
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "CH MUJER PASION.",
      price: 120.000,
      images: [
        "https://cdn5.coppel.com/mkp/10323813-1.jpg?iresize=width:400,height:320",
        "https://agatha.tienda/wp-content/uploads/2023/09/8411061055199.jpg",
    
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "Good Girl Sparkling Ice.",
      price: 120.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2024/11/Good-Girl-Sparkling-Ice.jpeg",
        "https://cdn.valmara.co/57394-large_default/good-girl-sparkling-ice-carolina-herrera-80-ml-edp.webp",
        
      ]
    }, {
      name: "Perfume CAROLINA HERRERA",
      description: "Good Girl Dazzling Garden",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCLg7Jv-PRvh-WOcWvujUuuW1WPo_j9IvZMrbGxqCeeCA-uY6xgL2Qmr4089O5jR7VMow&usqp=CAU",
        "https://media.douglas.es/medias/NYy11I1131487-0-global.jpg?context=bWFzdGVyfGltYWdlc3wxOTExNTV8aW1hZ2UvanBlZ3xhR0ZpTDJnME9DODJNelU1TmprME1EazRORE0xTUM5T1dYa3hNVWt4TVRNeE5EZzNYekJmWjJ4dlltRnNMbXB3Wnd8YWNiZTM5ODdjZWFmOTYzM2Q2NGY5ZjZlZjM2MjQzZTEyZWQ1ZWViZjdhNDcyMGRmYjVhNTg3YjAxZGIyNjcwMg&grid=true",
    
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "Lunar Lover Limited Edition 2025",
      price: 120.000,
      images: [
        "https://media.johnlewiscontent.com/i/JohnLewis/113180172alt1?fmt=auto&$background-off-white$",
        "https://fimgs.net/images/perfume/270x270.100903.jpg",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "Bad Boy Dazzling Garden",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_889913-MLA89396759505_082025-O.webp",
        "https://labelleperfumes.com/cdn/shop/files/CarolinaHerreraBadBoyDazzlingGarden-ad2_800x.webp?v=1709673476",
       
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "bad boy cobalt elixir",
      price: 120.000,
      images: [
        "https://cdn.fragrancenet.com/images/photos/600x600/485257.jpg",
        "https://media.falabella.com/falabellaCO/72869242_1/w=800,h=800,fit=pad",
    
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: " Bad Boy",
      price: 120.000,
      images: [
        "https://static.beautytocare.com/cdn-cgi/image/f=auto/media/catalog/product//c/a/carolina-herrera-bad-boy-eau-de-parfum-100ml.jpg",
        "https://m.media-amazon.com/images/I/613EMzfu0QL.jpg",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: " 212 Sexy",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/61JVgPeoIJL._UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/41ovYrGOgAL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "La Bomba Mujer.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_765913-MLA85396234808_062025-O.webp",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.105931.jpg",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "212 NYC.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/51069RGaMBL._UF1000,1000_QL80_.jpg",
        "https://www.druni.es/media/catalog/product/4/1/419.jpg",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "212 VIP.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/61e1hAEbMFL._UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/51KiLKGE7WS._UF1000,1000_QL80_.jpg",
        
      ]
    },
     {
      name: "Perfume CAROLINA HERRERA",
      description: "212 SEXY HOMBRE",
      price: 120.000,
      images: [
        "https://essenzaperfumes.cr/wp-content/uploads/2019/11/212-sexy-hombre.jpg",
        "https://essenzaperfumes.cr/wp-content/uploads/2019/11/1571189867.jpg" 
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "Amazonian Rose.",
      price: 120.000,
      images: [
        "https://www.edgars.co.za/cdn/shop/files/8411061083260_2_c175c197-0b97-4107-abe9-154a1a69a7b0_1800x1800.jpg?v=1720783943",
        "https://media.falabella.com/falabellaCL/7974879_1/public"
      ]
    },
    {
      name: "Perfume KAROL G",
      description: "Bond 9 Bleecker Street",
      price: 130.000,
      images: [
        "https://cdn.fragrancenet.com/images/photos/900x900/150842.jpg",
        "https://m.media-amazon.com/images/I/71-hiJmvMuL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume VALENTINO",
      description: " Uomo Born in Roma.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/71+m+UpIUdL._UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/71syw+SxVkL._UF350,350_QL80_.jpg",
       
      ]
    },
    {
      name: "Perfume VALENTINO",
      description: "Donna Born In Roma.",
      price: 130.000,
      images: [
        "https://m.media-amazon.com/images/I/71k3hQiDEzL._UF1000,1000_QL80_.jpg",
        "https://media.falabella.com/falabellaCL/50285361_1/w=800,h=800,fit=pad",
        
      ]
    },
    {
      name: "Perfume VALENTINO",
      description: " Uomo Born in Roma Green Stravaganza.",
      price: 130.000,
      images: [
        "https://m.media-amazon.com/images/I/617H86eN+3L._UF1000,1000_QL80_.jpg",
        "https://labelleperfumes.com/cdn/shop/files/Valentino_Uomo_Born_in_Roma_Green_Stravaganza-m_2400x.webp?v=1735233289"
      ]
    },
    {
      name: "Perfume GIORGIO ARMANI",
      description: " Di Gio.",
      price: 120.000,
      images: [
        "https://images-cdn.ubuy.co.in/65a01d65e171df7d7d3f3230-giorgio-armani-eau-de-parfum-spray-4-2.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51FMIHcmstL._AC_UL600_SR600,600_.jpg",
    
      ]
    },
    {
      name: "Perfume GIORGIO ARMANI",
      description: "Profondo.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/61ua-J-eHLL._UF1000,1000_QL80_.jpg",
        "https://ss701.liverpool.com.mx/xl/1158182056.jpg",
    
      ]
    },
    {
      name: "Perfume ARMAF",
      description: "Club De Nuit Intense Man.",
      price: 130.000,
      images: [
        "https://media.falabella.com/falabellaPE/124677936_01/w=240,h=240,fit=pad",
        "https://m.media-amazon.com/images/I/416YO7W+nsL._SL1500_.jpg",
        
      ]
    }, 
    {
      name: "Perfume ARMAF",
      description: "Club de Nuit Oud",
      price: 130.000,
      images: [
        "https://perfumerackph.com/cdn/shop/files/Untitled_design_64.png?v=1732229191&width=1445",
        "https://m.media-amazon.com/images/I/61bqdvLJ3rL._UF1000,1000_QL80_.jpg",
    
      ]
    },
    {
      name: "Perfume ARMAF",
      description: "Club de Nuit Blue Iconic",
      price:130.000,
      images: [
        "https://m.media-amazon.com/images/I/61z2xe-LLBL._UF1000,1000_QL80_.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_774050-MLU78975994059_092024-O.webp",
        
      ]
    },
    {
      name: "Perfume ARMAF",
      description: "Club De Nuit para mujer",
      price: 130.000,
      images: [
        "https://m.media-amazon.com/images/I/71Sx3oTiSsL._UF1000,1000_QL80_.jpg",
        "https://ss701.liverpool.com.mx/xl/1103381726.jpg",
        
      ]
    },
    {
      name: "Perfume ARMAF",
      description: "Odyssey Mandarin Sky",
      price: 130.000,
      images: [
        "https://m.media-amazon.com/images/I/51ecNhUmgeL._UF1000,1000_QL80_.jpg",
        "https://fragarabic.com/cdn/shop/files/Odyssey_Mandarin_Sky_Armaf_Eau_de_Parfum_Para_Hombre_con_fondo_con_ingredientes.webp?v=1750864951&width=1024",
    
      ]
    },
    {
      name: "Perfume BURBERRY",
      description: "Women 3.4 Edp",
      price: 130.000,
      images: [
        "https://bestperfumesmiami.com/cdn/shop/files/Burberry-Classic-Eau-de-Parfum-Perfume-for-Women-1-Oz-901c2e73-368d-477c-a559-3f9502dc3462_1b8910ffed84e80c7a314fa233295b03_jpeg.jpg?v=1700516087",
        "https://m.media-amazon.com/images/I/61B1OybL7rL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume BURBERRY",
      description: "Her Eau de Parfum",
      price: 130.000,
      images: [
        "https://www.dalish.gt/imagenes-productos/31503614227693876-76282024-10-30.jpg",
        "https://felix.com.pa/cdn/shop/files/3614227693876_1_2048x.jpg?v=1755543871",
        
      ]
    },
    {
      name: "Perfume BURBERRY",
      description: "BLACK.",
      price: 130.000,
      images: [
        "https://i1.perfumesclub.com/grande/152708-2.jpg",
        "https://m.media-amazon.com/images/I/51QTTh5ZktL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume CALVIN KLEIN",
      description: "Eternity para mujer.",
      price: 140.000,
      images: [
        "https://madeira.com.co/cdn/shop/files/088300601400_1.jpg?v=1716049884",
        "https://ss701.liverpool.com.mx/xl/1071930815.jpg",
        
      ]
    },
    {
      name: "Perfume CALVIN KLEIN",
      description: "Euphoria.",
      price: 140.000,
      images: [
        "https://www.nmperfumerias.cl/cdn/shop/products/Calvin-Klein-Euphoria_1200x_1b9544e0-c5ea-4c96-99e3-9da31a0b7cbb.jpg?v=1754936390",
        "https://www.worten.es/i/7d7ffe7aa771e68a335ee35139d9dfd11c4825dc",
        
      ]
    },
        {
      name: "Perfume CALVIN KLEIN",
      description: "Obsession.",
      price: 140.000,
      images: [
        "https://noirperfumeria.co/cdn/shop/files/imagen_2023-05-07_014145296.png?v=1683441708",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.248.jpg" 
      ]
    },
    {
      name: "Perfume CALVIN KLEIN",
      description: " Ck In2u For Her Para Mujer.",
      price: 140.000,
      images: [
        "https://i.zst.com.br/thumbs/45/27/17/1953216546.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_904972-MLV52574202081_112022-O.webp"
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "212 Heroes Forever Young",
      price: 130.000,
      images: [
        "https://mundoaromas.cl/cdn/shop/products/Perfume-Carolina-Herrera-212-Heroes-For-Her-EDP-W-80-ml_1800x_93fe6118-a911-4551-aeac-8f535017cd7f.webp?v=1668626232",
        "https://http2.mlstatic.com/D_NQ_NP_794276-MLU70065300063_062023-O.webp",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "212 NYC tradicional.",
      price: 120.000,
      images: [
        "https://perfumescolombia.com.co/cdn/shop/products/212-nyc-carolina-herrera-11-premium-1920455.png?v=1751884213",
        "https://www.sephora.com.br/dw/image/v2/BFJC_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/pt_BR/dw333a7a4c/images/hi-res-BR/_515A7F3C-1DC6-4357-B3E3-EB4E8BA3110B__carolina-herrera-212-woman_500px.jpg?sw=556&sh=680&sm=fit",
       
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "212 Vip Rosé.",
      price: 120.000,
      images: [
        "https://media.falabella.com/falabellaCO/2187740_2/w=800,h=800,fit=pad",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAPt7u7MWYwkVY_yw6_m-2RdXAFqfxd6tZ-x1gwyt6ewaTFjBBPZ7p_xYDecKNpIbokqc&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "CH L.",
      price: 140.000,
      images: [
        "https://perfumaste.com/wp-content/uploads/2025/01/Perfume-Ch-LEau-De-Carolina-Herrera-Para-Mujer-100-ml.jpg",
        "https://emporiodutyfree.com/wp-content/uploads/2017/04/CH-LEAU-CAROLINA-HERRERA-100-ML-MUJER-B.jpg"
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: " CH L'eau Fraiche Spray.",
      price: 140.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_980398-MLU69392434516_052023-O.webp",
        "https://www.parfemy-elnino.cz/data/cache/thumb_min500_max1000-min500_max1000-12/products/85457/1527503991/carolina-herrera-ch-l-eau-eau-fraiche-pro-zeny-100-ml-169409.jpg",
    
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: " EDT Para Mujer.",
      price: 140.000,
      images: [
        "https://perfumaste.com/wp-content/uploads/2025/01/Perfume-Carolina-Herrera-Para-Mujer-100-ml.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_831319-MLU74956682187_032024-O.webp",
    
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: " Prive Para Mujer.",
      price: 140.000,
      images: [
        "https://s3-us-west-1.amazonaws.com/calzzapato/zoom/09ECWG-1.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51ND0+twamL._SL500_._AC_SL500_.jpg",
        
      ]
    }, {
      name: "Perfume CAROLINA HERRERA",
      description: "Ch Sublime",
      price: 140.000,
      images: [
        "https://fragrancebd.com/wp-content/uploads/2020/10/Carolina-Herrera-CH-Sublime-EDP-80mL.png",
        "https://www.revistavpc.es/images/Antic/Carolinaherrerasublime.png",
    
      ]
    },
    {
      name: "Perfume CHANEL",
      description: "Allure",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/612-VnCxc6L._UF1000,1000_QL80_.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_917125-MLA50431360701_062022-O.webp",
        
      ]
    },
    {
      name: "Perfume CHANEL",
      description: "No 5",
      price: 120.000,
      images: [
        "https://edropcr.com/wp-content/uploads/2025/03/Chanel-N5-edp-1.jpg",
        "https://m.media-amazon.com/images/I/41tEJylR89L._SL1081_.jpg",
        
      ]
    },
    {
      name: "Perfume CHANEL",
      description: "Coco",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/chanel-coco-mademoiselle-perfumes-695.webp?v=1713416834",
        "https://media.falabella.com/falabellaCO/3443687_1/w=1500,h=1500,fit=pad",
    
      ]
    },
    {
      name: "Perfume CHANEL",
      description: "CHANCE",
      price: 120.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/perfume_chanel_chance_100ml_eau_de_parfum.jpg?v=1732213500",
        "https://media.falabella.com/falabellaCO/3443691_1/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume CHANEL",
      description: "Fraiche",
      price: 120.000,
      images: [
        "https://exitocol.vtexassets.com/arquivos/ids/23641858/perfume-chance-chanel-eau-fraiche-eau-toilette-100-ml-dama.jpg?v=638566620943670000",
        "https://ss701.liverpool.com.mx/xl/1084982198.jpg",
        
      ]
    },
    {
      name: "Perfume CHANEL",
      description: "Vive.",
      price: 120.000,
      images: [
        "https://beverlyhillssa.com/wp-content/uploads/2023/05/CHANEL-CHANCE-EDP-D-3.4-OZ-1.jpg",
        "https://ss701.liverpool.com.mx/xl/1079485159.jpg",
        
      ]
    },
    {
      name: "Perfume CHANEL",
      description: " Bleu",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/files/bleu-chanel-edp-100-ml.png?v=1696695579",
        "https://media.falabella.com/falabellaCO/3526166_1/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: "MISS DIOR.",
      price: 120.000,
      images: [
        "https://fsperfumespr.com/cdn/shop/products/3348901571449_031e24c1-251b-4bfa-81da-b78cb69524fe_1200x.jpg?v=1754759837",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFC9R7T1lC5-PGQ5FyGH-MP_1CYQz7tidoMM19G0uqYJmDxDHhbZnmGwP39V6m7GfVbbA&usqp=CAU",
      ,
        
      ]
    },
     {
      name: "Perfume CHRISTIAN DIOR",
      description: "Miss Dior Blooming Bouquet.",
      price: 120.000,
      images: [
        "https://deperfumes.co/wp-content/uploads/2024/10/perfume-para-dama-miss-dior-blooming-bouquet-de-christian-dior-100-ml-edp-1.jpg",
        "https://abscents.com.mx/cdn/shop/files/1081278683-fotor-20240329102132.png?v=1711729305&width=900" 
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: " Hypnotic Poison.",
      price: 120.000,
      images: [
        "https://priceonline.mx/cdn/shop/products/9d76b6ece42ece4e656ae979a9d7aee1_original_300x300.jpg?v=1613418351",
        "https://www.aromas.es/on/demandware.static/-/Sites-aro-master-catalog/default/dwfb641d99/images/large/3348901250351.jpg"
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: "SAUVAGE",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_638975-MLA88750351032_082025-O.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP54ruCn5CWUfiyP_DR3bN50865HkuRbl2-9GXOZ91o4yqSNpkwrOCUGRgv1ktxHkHeE0&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: "DIOR ADDICT.",
      price: 120.000,
      images: [
        "https://perfumeplanet.com.pa/cdn/shop/products/61im0S4zuCL._SL1000.jpg?v=1663015194&width=533",
        "https://aromasyrecuerdos.com/wp-content/uploads/2022/10/DIOR-ADDICT-EAU-FRAICHE-EDT-100ml-1-min.jpg",
       
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: "J'Adore Infinissime.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/61WnWFXvaeL._UF1000,1000_QL80_.jpg",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.210.jpg",
        
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: "Joy Intense.",
      price: 120.000,
      images: [
        "https://perfumeriacristlaurent.com/wp-content/uploads/2023/10/Perfume-Joy-Dior-EDP-Intense-de-Christian-Dior-1.jpg",
        "https://fraganciasboutique.com/cdn/shop/files/Disenosintitulo-2024-05-10T112703.339_400x.png?v=1756829327"
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: " Dolce Vita.",
      price: 120.000,
      images: [
        "https://perfumesmundiales.com/wp-content/uploads/2020/08/Perfume-Dolce-Vita-Dior.png",
        "https://dperfumes.cl/wp-content/uploads/2022/06/dolce-vita-eau-de-toilette-100-ml-dior.webp",
    
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: "Creed Aventus.",
      price: 120.000,
      images: [
        "https://facescol.vtexassets.com/arquivos/ids/175597/3508441104662_1.JPG.jpg?v=637995616487170000",
        "https://http2.mlstatic.com/D_NQ_NP_793175-MLA85848270465_062025-O.webp",
    
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: " Love in Black de Creed.",
      price: 120.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2022/11/creed-love-in-black-300x300.jpg",
        "https://emporiodutyfree.com/wp-content/uploads/2022/03/perfume-creed-love-in-black-for-her-edp-75-ml-B.jpg",
        
      ]
    }, {
      name: "Perfume CHRISTIAN DIOR",
      description: "CREED Love In White",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_756833-CBT80682017758_112024-O.webp",
        "https://www.worten.es/i/5a12b3bee37facd2fd33ebf6077eb40da96829a5",
    
      ]
    },
    {
      name: "Perfume DKNY",
      description: " Be Delicious",
      price:120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-be-delicious-dkny-100ml-mujer-eau-de-parfum-1501010_580x.jpg?v=1758672854",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.498.jpg",
        
      ]
    },
    {
      name: "Perfume  DKNY",
      description: "Be Delicious Fresh Blossom",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-be-delicious-fresh-blossom-dkny-eau-de-parfum-100ml-mujer-8719320_580x.jpg?v=1758672855",
        "https://vendome.com.py/wp-content/uploads/2020/06/DKNY20Be20Delicious20Fresh20Blossom20Eau20de20Parfum20100ml.jpg",
        
      ]
    },
    {
      name: "Perfume  DKNY",
      description: "Be 100% Delicious",
      price: 120.000,
      images: [
        "https://priveperfumes.com/cdn/shop/files/perfume-dkny-be-100-delicious-edp-w-100-ml-1-prive-perfumes.webp?v=1738139817&width=1200",
        "https://www.jaiperfumeria.com/wp-content/uploads/2023/06/DKNY-Be-100-delicious-eau-de-parfum-100-ml.-mujer2.jpg",
    
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: "Q",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_652678-MLU71944536380_092023-O.webp",
        "https://disfragancias.com/cdn/shop/products/Dolce-gabbana-Q.jpg?v=1699808281",
        
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: " Light Blue",
      price: 120.000,
      images: [
        "https://static.wixstatic.com/media/7e4077_b5f314c432984ee38e03c91d87c6eef6~mv2.jpg/v1/fill/w_520,h_578,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7e4077_b5f314c432984ee38e03c91d87c6eef6~mv2.jpg",
        "https://n.nordstrommedia.com/it/46df2bcb-212e-4f8c-8e44-a04b3addfe0c.jpeg?h=368&w=240&dpr=2",
        
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: "Bottled Unlimited.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_663396-MLA70285337835_072023-O.webp",
        "https://cnfstore.com/pub/media/catalog/product/cache/2a62a76a24179803c442e74cd57fe434/l/i/light_blue_eau_intense_edp_.jpg",
        
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: "L' Impératrice.",
      price: 120.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2022/02/l-imperatrice-dolce-gabbana_1024x1024@2x.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_811052-MLU75992455275_042024-O.webp",
        
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: " The One.",
      price: 120.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2023/02/the-one-dama.jpg",
        "https://cdn.perfumeriacomas.com/media/catalog/product/cache/c2bc8a7ff6556453a8af3ba550eb96ed/1/7/17903_1-DG_THE_ONE_EPV_75ML_1_1.png",
        
      ]
      },
    {
      name: "Perfume DOLCE & GABBANA",
      description: "King Tester.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_668884-MLV76572273651_052024-O.webp",
        "https://myevastore.com/cdn/shop/files/w_1500_h_1500_fit_pad_1200x.jpg?v=1738941785",
        
      ]
      
    },
    {
      name: "Perfume FRED HAYMAN",
      description: "273.",
      price: 170.000,
      images: [
        "https://cdn.shopify.com/s/files/1/2978/5842/products/perfume-273-for-women-by-fred-hayman-eau-de-parfum-spray-1.jpg",
        "https://cdn.salla.sa/EGKqA/ELlpcsBzv1jDsBMSdZfXNTxXsrN57fCFBWffbDDr.jpg" 
      ]
    },
    {
      name: "Perfume FRED HAYMAN",
      description: "TOUCH.",
      price: 130.000,
      images: [
        "https://villarreal.com.co/852-large_default/touch-de-fred-hayman-agua-de-tocador-edt-34-onzas-100-mililitros.jpg",
        "https://disfragancias.com/cdn/shop/products/fred-h-touch.jpg?v=1699805813"
      ]
    },
    {
      name: "Perfume GIORGIO ARMANI",
      description: "CODE",
      price: 120.000,
      images: [
        "https://emporiodutyfree.com/wp-content/uploads/2017/09/ARMANI-CODE-EDP-75-ML-MUJER.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQAKtYRMA_WSEYLyL8SYL1geOmBi0eQxV1rPH90EXEeQqjPZaTQNkOFpoaXVpF8end8j4&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume GIORGIO ARMANI",
      description: " My Way.",
      price: 120.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2022/03/giorgio-armani-my-way-edp-30-ml-spray_1024x1024@2x.jpg",
        "https://images.fravega.com/f300/6e0263ef63262f27fa2026f729cee075.jpg.webp",
       
      ]
    },
    {
      name: "Perfume GIORGIO ARMANI",
      description: "Si.",
      price: 120.000,
      images: [
        "https://cdn5.coppel.com/mkp/103216117-1.jpg?iresize=width:400,height:320",
        "https://media.falabella.com/falabellaCL/3860939_1/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume GIORGIO ARMANI",
      description: "Si Passione.",
      price: 120.000,
      images: [
        "https://i.ebayimg.com/images/g/SrEAAOSw-GZgdVbC/s-l1200.jpg",
        "https://aromasyrecuerdos.com/wp-content/uploads/2022/10/SI-PASSIONE-Eau-de-Parfum-Giorgio-Armani.jpg"
      ]
    },
    {
      name: "Perfume GIORGIO ARMANI",
      description: "Acqua Di Gio.",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/products/AcquaDiGio100mlHm.jpg?v=1707501136",
        "https://www.ubuy.gt/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFhM1VzQnRpTEwuX1NMMTUwMF8uanBn.jpg",
    
      ]
    },
    {
      name: "Perfume GIORGIO ARMANI",
      description: " Acqua Di Gio Absolu.",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/giorgio-armani-acqua-di-gio-absolu-125-ml-perfumes-939.webp?v=1713416137",
        "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/208868999/variant/images/baf1724a-e210-4981-aa32-d5f487cde070/208868999-0000-001.jpg",
    
      ]
    },
    {
      name: "Perfume GIORGIO ARMANI",
      description: "Aqua Di Giò para hombre.",
      price: 120.000,
      images: [
        "https://exitocol.vtexassets.com/arquivos/ids/23651697/perfume-giorgio-armani-acqua-di-gio-eau-profumo-125ml.jpg?v=638566770598230000",
        "https://ss701.liverpool.com.mx/xl/1158182081.jpg",
        
      ]
    }, {
      name: "Perfume GIVENCHY",
      description: "Amarige",
      price: 170.000,
      images: [
        "https://i5.walmartimages.com/asr/90070c1f-1634-49bd-8f9f-90469006a8bd.d7db98f741f4943ab93b4220af60b4a2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        "https://www.bellaroma.mx/wp-content/uploads/2020/05/givenchy-amarige-perfume-mujer.jpg",
    
      ]
    },
    {
      name: "Perfume GIVENCHY",
      description: "Ange Ou Demón",
      price: 120.000,
      images: [
        "https://farmaciasdelpueblo.vtexassets.com/arquivos/ids/186384/Givenchy-Ange-Ou-Demon-Edp-x-30-ml-3274872396203_img1.png?v=638370330927770000",
        "https://ss701.liverpool.com.mx/xl/52670144.jpg",
        
      ]
    },
    {
      name: "Perfume GIVENCHY",
      description: "Ange Ou Demon Le Secret",
      price: 120.000,
      images: [
        "https://deperfumes.co/wp-content/uploads/2022/08/perfume-ange-ou-demon-le-secret-de-givenchy-para-mujer-4.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaWo_DJorG8d_R4FVKadQMaJ9zFOttIjb0rozmq08m0x4s15QxRw9Z9CrLi291BgP3ZMw&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume GIVENCHY",
      description: "Organza",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/61qRojAO20L._SL1500_.jpg",
        "https://perfumeriafirst.com/cdn/shop/products/21236p_cec1f09a-01c4-4fe3-9422-952ee09c0f23.jpg?v=1747505794",
    
      ]
    },
    {
      name: "Perfume GIVENCHY",
      description: "IRRESISTIBLE",
      price: 120.000,
      images: [
        "https://facescr.vtexassets.com/arquivos/ids/186673/3274872469013_1.jpg?v=638424290632130000",
        "https://www.sephora.com.mx/on/demandware.static/-/Sites-masterCatalog_Sephora/es_MX/dw7ac33054/images/hi-res/boletos/Roc%C3%ADo%20Mart%C3%ADnez/GIVENCHY/GIVENCHY%204/3274872456129_1.jpg",
        
      ]
    },
    {
      name: "Perfume GUCCI",
      description: " Bamboo",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/51kiG98B03L.jpg",
        "https://a.cdnsbn.com/images/products/xl/19120233806-2.jpg",
        
      ]
    },
    {
      name: "Perfume GUCCI",
      description: " Bloom.",
      price: 120.000,
      images: [
        "https://www.bigw.com.au/medias/sys_master/images/images/h76/h5d/98432061210654.jpg",
        "https://hrd-live.cdn.scayle.cloud/images/c1f9882b65fa4f40aac36ce9e414ac30.jpg?brightness=1&width=922&height=1230&quality=75&bg=ffffff",
        
      ]
    },
    {
      name: "Perfume GUESS",
      description: "ROSADO MUJER.",
      price: 170.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/perfume-guess-75ml-mujer-original.jpg?v=1705202427",
        "https://perfumeriaonlinex.com/wp-content/uploads/2021/06/Perfume-Guess-Guess-75-ML-Mujer.jpg",
        
      ]
    },
    {
      name: "Perfume GUESS",
      description: "Girl Mujer.",
      price: 170.000,
      images: [
        "https://holacompras.com/wp-content/uploads/2022/07/PERF-GUESS-GIRL-1.jpg",
        "https://disfragancias.com/cdn/shop/products/Guess-girl-2.jpg?v=1699805485",
        
      ]
    },
     {
      name: "Perfume GUESS",
      description: "gold para dama.",
      price: 170.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/products/GuessGold.jpg?v=1649537910",
        "https://www.perfumes.com.ph/cdn/shop/files/guess-gold-75ml-perfume-philippines-best-price-2.webp?v=1698319188&width=800" 
      ]
    },
    {
      name: "Perfume GUESS",
      description: "By Marciano.",
      price: 170.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-guess-by-marciano-eau-de-parfum-100ml-mujer-1222659_580x.jpg?v=1758671669",
        "https://disfragancias.com/cdn/shop/products/Guess-marciano-2_medium.jpg?v=1699805480"
      ]
    },
    {
      name: "Perfume GUESS",
      description: " Uomo Acqua",
      price: 170.000,
      images: [
        "https://media.falabella.com/falabellaCO/69706736_001/w=800,h=800,fit=pad",
        "https://acdn-us.mitiendanube.com/stores/525/721/products/uomo-acqua-edt-compressed-21c17731c82a32949816971295073746-640-0.jpg",
        
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "DEEP RED.",
      price: 120.000,
      images: [
        "https://perfumesmb.com.ec/wp-content/uploads/2020/06/deep-red.jpg",
        "https://i5.walmartimages.com/asr/b76c2f30-6818-4608-b200-58631ec51ee2.f2c75fd42319493826d2ccab3fb56e89.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
       
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Femme.",
      price: 120.000,
      images: [
        "https://www.superbuys.com.au/assets/full/737052041353.jpg?20230314221023",
        "https://i5.walmartimages.com/seo/Hugo-Boss-Boss-Femme-Eau-De-Parfum-Spray-Perfume-for-Women-2-5-oz_5d576574-225c-49a6-8e19-d2d90dc0a53d.74d9c6835d0a86bc121fa92fbdfb748d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: " XX.",
      price: 120.000,
      images: [
        "https://www.my-origines.com/dw/image/v2/BJRD_PRD/on/demandware.static/-/Sites-size-master/default/dwda2edd61/images/11114A40_P.jpg?sw=1500&sh=1500&sm=fit",
        "https://www.perfumedirect.com/cdn/shop/products/hugo-boss-women-s-perfume-hugo-boss-hugo-xx-woman-eau-de-toilette-women-s-perfume-spray-100ml-3746306523229_grande.png?v=1631660399"
      ]
    },
    {
      name: "Perfume ISSEY MIYAKE",
      description: "L'eau D'issey.",
      price: 120.000,
      images: [
        "https://emporiodutyfree.com/wp-content/uploads/2015/04/LEAU-DISSEY-EDT-100-ML-MUJER.jpg",
        "https://essentia.com.do/wp-content/uploads/2024/02/Paco-Rabanne-1-Million.png",
    
      ]
    },
    {
      name: "Perfume JEAN PAUL",
      description: "Le Male Le Parfum.",
      price: 140.000,
      images: [
        "https://priveperfumes.com/cdn/shop/files/perfume-jean-paul-gaultier-le-male-le-parfum-edp-m-125-ml-2-prive-perfumes.webp?v=1743662106&width=813",
        "https://media.falabella.com/falabellaCO/5259240_1/w=1500,h=1500,fit=pad",
    
      ]
    },
    {
      name: "Perfume JEAN PAUL",
      description: " Le Beau",
      price: 140.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_955415-MLU75850210599_042024-O.webp",
        "https://aliss.do/media/catalog/product/1/7/1752d728dc815fcae7a4d769e61d3b57d600e926_file.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
        
      ]
    }, {
      name: "Perfume JEAN PAUL",
      description: " Le Male Elixir",
      price: 140.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/perfume_jean_paul_le_male_elixir.webp?v=1735252589",
        "https://perfumes.ec/cdn/shop/files/JeanPaulGaultierLeMaleElixir125ml.png?v=1713234668",
    
      ]
    },
    {
      name: "Perfume JEAN PAUL",
      description: " le Beau",
      price:140.000,
      images: [
        "https://cdn.valmara.co/54479-medium_default/perfume-para-hombre-le-beau-le-parfum-jran-paul-gaultier-125-ml.webp",
        "https://acdn-us.mitiendanube.com/stores/001/071/596/products/le-beau-parfum1-0017c992940731ee9c16544718413114-640-0.jpg",
        
      ]
    },
    {
      name: "Perfume JEAN PAUL",
      description: "LA BELLE PARADISE",
      price: 140.000,
      images: [
        "https://perfumesimperial.com.co/cdn/shop/files/PAR2.webp?crop=center&height=800&v=1731602316&width=800",
        "https://xeira.es/wp-content/uploads/2023/05/LA-BELLE-FLEUR-TERRIBLE-JPG-EDP-100mL-Bottle-new.jpg",
        
      ]
    },
    {
      name: "Perfume JEAN PAUL",
      description: "GAULTIER",
      price: 140.000,
      images: [
        "https://rdlasamericas.cl/14422-home_default/jean-paul-gaultier-scandal-paris-woman-edt-80ml.jpg",
        "https://medipielsa.vtexassets.com/arquivos/ids/194540-300-300?v=638617489663900000&width=300&height=300&aspect=true"
      ]
    },
    {
      name: "Perfume JEAN PAUL",
      description: " GAULTIER SO SCANDAL",
      price: 140.000,
      images: [
        "https://www.mapy.com.py/wp-content/uploads/2024/10/391480.jpg",
        "https://perfumeseden.com/media/b8/ce/6f/1663225440/97079X.JPG",
        
      ]
    },
    {
      name: "Perfume JEAN PAUL",
      description: " Scandal Gold",
      price: 140.000,
      images: [
        "https://disfragancias.com/cdn/shop/products/jean-paul-gaultier-scandal-gold-2.jpg?v=1699808891",
        "https://perfumerialepetit.com/cdn/shop/files/descripcion_corta_para_pagina_web_del_set_bvlgari_omnia_amethyste_con_perfume_de_100_ml_y_de_15_ml_con_sus_notas_ocasiones_para_salir_y_clima_-_2024-10-16T025313.881.png?v=1729065240",
        
      ]
    },
    {
      name: "Perfume KATY PERRY",
      description: "Purr.",
      price: 120.000,
      images: [
        "https://timeshopcolombia.com/images/stories/virtuemart/product/katty%20perry%20purr.jpg",
        "https://demayoreo.com/cdn/shop/products/Liv1556-31556_2824b87e-549c-4046-9c66-3a9ca33c61bc.jpg?v=1688628769",
        
      ]
    },
    {
      name: "Perfume KATY PERRY",
      description: "Meow.",
      price: 120.000,
      images: [
        "https://static.dafiti.com.co/p/katy-perry-8464-5643651-1-zoom.jpg",
        "https://disfragancias.com/cdn/shop/products/katy-meouw.jpg?v=1699805375",
        
      ]
    },
    {
      name: "Perfume KENZO",
      description: " Flower L'Absolue.",
      price: 120.000,
      images: [
        "https://static.wixstatic.com/media/7e4077_42236d23ae224a1b8f32b2e474291853~mv2.jpg/v1/fill/w_520,h_578,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7e4077_42236d23ae224a1b8f32b2e474291853~mv2.jpg",
        "https://yauras.cl/cdn/shop/files/CopiadeDisenosintitulo_18_6f7d2f10-cb19-469c-af06-c470a95a9a08_700x700.jpg?v=1753468824",
        
      ]
    },
        {
      name: "Perfume LANCOME",
      description: "MIRACLE.",
      price: 120.000,
      images: [
        "https://disfragancias.com/cdn/shop/files/Lancome-miracle.jpg?v=1705441155",
        "https://media.falabella.com/falabellaCL/547883_1/w=1500,h=1500,fit=pad" 
      ]
    },
    {
      name: "Perfume LANCOME",
      description: " La Vie est Belle.",
      price: 120.000,
      images: [
        "https://cellshop.com.py/media/catalog/product/3/5/355872_1_fe79_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=616&width=616&canvas=616:616",
        "https://i5.walmartimages.com/seo/Lancome-La-Vie-Est-Belle-Eau-de-Parfum-Perfume-for-Women-3-4-oz_58c64918-43bb-43de-b59b-57c03197d78f_2.75529471134cc5ca27ec0dd1d0fd3a57.jpeg"
      ]
    },
    {
      name: "Perfume LANCOME",
      description: "Treson",
      price: 130.000,
      images: [
        "https://marex.cl/wp-content/uploads/Lancome_-_Tresor_Eau_de_Parfum_Mujer.jpg",
        "https://static.dafiti.com.co/p/lancome-4223-6579661-2-zoom.jpg",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "Cloud Pink.",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-lacoste-l12-rose-eau-de-parfum-90ml-mujer-8332819_grande.jpg?v=1758671072",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.65875.jpg",
       
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "L.12.12 Pour Lui Fraiche.",
      price: 120.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2022/12/Perfume-Lacoste-Eau-L.12.12-Pour-Lui-Eau-Fraiche-100ml-Hombre-1.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ML1oo6OpcsxR3TBS33xxRz81JSlnV6ahYqqQj887mHYlICF6fsLwBo3rq-ucOzjkRoo&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume LACOSTE",
      description: "Sensuelle.",
      price: 120.000,
      images: [
        "https://www.pinasgifts.com/image/cache/data/fin/l6-500x500.jpg",
        "https://cdn.vesira.com/media/catalog/product/cache/7/image/650x/040ec09b1e35df139433887a97daa66f/l/a/lacoste-eau-de-lacoste-sensuelle-eau-de-parfum-vaporizador-90-ml-frasco.jpg"
      ]
    },
    {
      name: "Perfume MAISON FRANCIS KURKDJIAN",
      description: "Baccarat.",
      price: 120.000,
      images: [
        "https://martshop.com.ua/image/catalog/tovary/perfumery/analog_original/baccarat540.parfum.jpg",
        "https://i0.wp.com/irisfragancias.com/wp-content/uploads/2025/08/baccarat-rouge-540.jpg",
    
      ]
    },
    {
      name: "Perfume MAISON FRANCIS KURKDJIAN",
      description: "Rouge 540 .",
      price: 120.000,
      images: [
        "https://www.perfumestudiomnl.com/cdn/shop/files/7E87461B-8B02-4E62-AAC5-6452809AB69A.webp?v=1723447149",
        "https://m.media-amazon.com/images/I/61bRSsbOhBL._UF1000,1000_QL80_.jpg",
    
      ]
    },
    {
      name: "Perfume ARABE MAISON ALHAMBRA",
      description: "Delilah.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/41cvyushIoL._UF350,350_QL80_.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_955069-MLA78686814125_082024-O.webp",
        
      ]
    }, {
      name: "Perfume MONTBLACK",
      description: "Femme Individuelle",
      price: 130.000,
      images: [
        "https://disfragancias.com/cdn/shop/files/Individuelle-2_medium.jpg?v=1705522408",
        "https://m.media-amazon.com/images/I/81F56xeCH6L._UF1000,1000_QL80_.jpg",
    
      ]
    },
    {
      name: "Perfume MONTBLACK",
      description: "Lady Emblem",
      price: 130.000,
      images: [
        "https://cdnx.jumpseller.com/parisperfumes/image/7630352/resize/600/600?1581019931",
        "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/738071999/variant/images/2f74ec5d-00d2-4dc5-8292-c6891927d829/738071999-0000-001.jpg",
        
      ]
    },
    {
      name: "Perfume MOSCHINO",
      description: "Gold Fresh Couture",
      price: 130.000,
      images: [
        "https://static.beautytocare.com/media/catalog/product/m/o/moschino-gold-fresh-couture-eau-de-parfum-100ml.jpg",
        "https://jasmin.b-cdn.net/media/catalog/product/cache/4456161891bc26600241f10587ca424f/8/0/8011003838004_3.jpg",
        
      ]
    },
    {
      name: "Perfume MOSCHINO",
      description: "FRESH COUTURE",
      price: 130.000,
      images: [
        "https://static.wixstatic.com/media/85adb6_2502f09ad1654f8997d715e4e36c49d9~mv2.jpg/v1/fill/w_520,h_582,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/85adb6_2502f09ad1654f8997d715e4e36c49d9~mv2.jpg",
        "https://media.falabella.com/falabellaCL/4997865_1/w=800,h=800,fit=pad",
    
      ]
    },
    {
      name: "Perfume MOSCHINO",
      description: " Pink Fresh Couture",
      price: 130.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/products/MoschinoFreshPinkDm.jpg?v=1650421670",
        "https://http2.mlstatic.com/D_NQ_NP_713206-MLU76039922408_052024-O.webp",
        
      ]
    },
    {
      name: "Perfume MOSCHINO",
      description: " FUNNY",
      price: 130.000,
      images: [
        "https://static.wixstatic.com/media/85adb6_0f67c24f709446fb817017bcd3d3a772~mv2.jpg/v1/fill/w_520,h_582,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/85adb6_0f67c24f709446fb817017bcd3d3a772~mv2.jpg",
        "https://media.falabella.com/falabellaCO/9761239_1/w=800,h=800,fit=pad",
        
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Lady Million",
      price: 120.000,
      images: [

        "https://cdn.awsli.com.br/600x1000/1007/1007996/produto/197630494cde6aade78.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_947568-MLA47584294313_092021-O.webp",
        
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Lady Million Empire",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_733292-MLB46635122623_072021-O.webp",
        "https://frutafrescaco.vtexassets.com/arquivos/ids/74529332/3349668571970.jpg?v=638952764013600000",
        
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: ".Lady Million Fabulous",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-paco-rabanne-lady-million-fabulous-eau-de-parfum-intense-80ml-mujer-1266092_grande.jpg?v=1758671072",
        "https://m.media-amazon.com/images/I/61fEQ1OJDxL._UF1000,1000_QL80_.jpg",
        
      ]
    },
     {
      name: "Perfume PACO RABANNE",
      description: " Lady Million Lucky.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_927419-MLA77136153210_062024-O.webp",
        "https://cdn.valmara.co/57341-large_default/perfume-para-dama-lady-million-lucky-de-paco-rabanne-100-ml.webp" 
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Lady Million Privé.",
      price: 120.000,
      images: [
       
        "https://perfumaste.com/wp-content/uploads/2025/01/ladymillonp.jpg",
         "https://perfumeriacristlaurent.com/wp-content/uploads/2023/10/Perfume-Lady-Million-Prive-EDP-de-Paco-Rabanne-2.jpg",
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: " Lady Million Royal",
      price: 120.000,
      images: [
        "https://cdn4.volusion.store/ekfvz-npahx/v/vspfiles/photos/PF-778713-2.jpg?v-cache=1699356065",
        "https://ss701.liverpool.com.mx/xl/1133438901.jpg",
        
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: " XS Pure.",
      price: 120.000,
      images: [
        "https://perfumesmundiales.com/wp-content/uploads/2020/08/Perfume-XS-Pure-de-Paco-Rabanne-Para-damas.png",
        "https://media.falabella.com/falabellaCO/3772488_1/w=1500,h=1500,fit=pad",
       
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Black XS.",
      price: 120.000,
      images: [
        "https://felix.com.pa/cdn/shop/products/paco-rabanne-1057-65119652_2_2048x.jpg?v=1669844277",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/6/5/65119652-1.png",
        
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "OLYMPEA INTENSE.",
      price: 120.000,
      images: [
        "https://www.pigalle.com.uy/images/thumbs/0031493_9bd218ceac0ac7c4138cc6092516798d787858fa9bcc40334b5da6d43b68910b_600.jpeg",
        "https://irisfragancias.com/wp-content/uploads/2021/08/olympea-intense-paco-rabanne.jpg"
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Olympea Legend.",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXlloUrLdqQ_jDlTjNpzlBsTfxqhVA9IXPgBMjSsMcl3cXFh4jw0X2F6aE1F51d14wYgo&usqp=CAU",
        "https://acdn-us.mitiendanube.com/stores/124/985/products/3349668577521-c3939c93ba0fb7830917211537374658-1024-1024.jpg",
    
      ]
    },
    {
      name: "Perfume PACO RABANNE",
      description: "OLYMPEA AQUA.",
      price: 120.000,
      images: [
        "https://www.blueperfumeria.com/cdn/shop/products/OlympeaAquaPacoRabanne_995x.jpg?v=1697653878",
        "https://http2.mlstatic.com/D_NQ_NP_987011-MLA72170096679_102023-O.webp",
    
      ]
    },
    {
      name: "Perfume  PARFUM DE MARLY",
      description: "Delina La Rosee.",
      price: 130.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-marly-delina-la-rosee-eau-de-parfum-75ml-mujer-4873308_580x.jpg?v=1758669714",
        "https://http2.mlstatic.com/D_NQ_NP_691536-MLM83480377143_042025-O.webp",
        
      ]
    }, {
      name: "Perfume PARIS HILTON",
      description: "by Paris",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykGmsbQGahreQF6zRtFnXBPUMGwqot4FQnDUyBc0BJYMj37YJBqaM1cgNk8Xo1XDmN98&usqp=CAU",
        "https://m.media-amazon.com/images/I/81QRvpXH+bL._UF1000,1000_QL80_.jpg",
    
      ]
    },
    {
      name: "Perfume PARIS HILTON",
      description: "Can Can",
      price: 120.000,
      images: [
        "https://madeira.com.co/cdn/shop/products/608940533369_1.jpg?v=1610140847",
        "https://arome.mx/cdn/shop/files/perfume-can-can-para-mujer-de-paris-hilton-eau-de-parfum-100ml-arome-mexico-1.png?v=1725549886",
        
      ]
    },
    {
      name: "Perfume PARIS HILTON",
      description: "Can Can Blurlesque",
      price: 120.000,
      images: [
        "https://perfumesymarcas.com/wp-content/uploads/2022/08/Perfume-Can-Can-Burlesque-De-Paris-Hilton-Para-Mujer-100-ml.png.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51RFaXfJegL._SL500_._AC_SL500_.jpg",
        
      ]
    },
    {
      name: "Perfume PARIS HILTON",
      description: " Heiress",
      price: 120.000,
      images: [
        "https://priveperfumes.com/cdn/shop/files/perfume-paris-hilton-heiress-edp-w-100-ml-1-prive-perfumes.webp?v=1743661883&width=600",
        "https://attoperfumes.com.co/cdn/shop/products/Heiress.jpg?v=1650660576",
    
      ]
    },
    {
      name: "Perfume PERRY ELLIS",
      description: "360°",
      price: 120.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2023/02/360-dama.jpg",
        "https://demayoreo.com/cdn/shop/products/Liv1641-21641.jpg?v=1674236610",
        
      ]
    },
    {
      name: "Perfume PERRY ELLIS",
      description: "360º Coral",
      price: 120.000,
      images: [
        "https://lamarinamx.vtexassets.com/arquivos/ids/177351/844061009400-1.jpg?v=637263868655930000",
        "https://i5.walmartimages.com/asr/3b3a8270-db60-4da7-8cd3-a0bf746ae59f.063fce27e918476824f97e8648970ab5.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        
      ]
    },
    {
      name: "Perfume PERRY ELLIS",
      description: " 360 Purple.",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/asr/5040ba68-79df-4e81-a00e-64548191188c.2ec76f931ad0daac4ac2a38bbacd10da.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        "https://m.media-amazon.com/images/I/71WBIHZbwhL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume PERRY ELLIS",
      description: "360 Red.",
      price: 120.000,
      images: [
        "https://www.mueblesamerica.mx/img/1024/1024/resize/P/E/PERY00009_x1_1.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKPrXLALzFGWT443b6f7AIYRYlnCp5QW4XV5NcNSHBxfmeqpYG7SslxJ3je3sAaS80dEk&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume POLO",
      description: " Ralph Lauren.",
      price: 120.000,
      images: [
        "https://holacompras.com/wp-content/uploads/2022/07/PERF-RALP-TURQ-1.jpg",
        "https://m.media-amazon.com/images/I/613Ev69+IgL._UF1000,1000_QL80_.jpg",
        
      ]
      
     },
    {
      name: "Perfume POLO",
      description: "Big Pony 2 Mujer.",
      price: 120.000,
      images: [
        "https://emporiodutyfree.com/wp-content/uploads/2019/02/Big-Pony-Pink-No-2-Ralph-Lauren-Mujer.jpg",
        "https://exdtvcqvfop.exactdn.com/wp-content/uploads/Big-Pony-2-de-Ralph-Lauren-para-mujer-botella.jpg?strip=all&lossy=1&ssl=1"
      ]
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Bottled Bold Citrus",
      price: 120.000,
      images: [
        "https://media.falabella.com/falabellaCO/73326163_2/w=800,h=800,fit=pad",
        "https://media.falabella.com/falabellaCO/73326163_1/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume THIERRY MUGLER",
      description: "Angel para mujer.",
      price: 160.000,
      images: [
        "https://acdn-us.mitiendanube.com/stores/001/206/277/products/0aae76c4b80880a981e3966309c826a71-7bbd6c73f82dab523416178336749726-1024-1024.jpg",
        "https://ss701.liverpool.com.mx/xl/1105983103.jpg",
       
      ]
    },
    {
      name: "Perfume THIERRY MUGLER",
      description: "Angel para mujer.",
      price: 170.000,
      images: [
        "https://cf.shopee.co.id/file/f59676f58af8e6fe2adb8da9d98276e0",
        "https://img.grouponcdn.com/stores/3NG3keSi2shgjdCuzrbZaZz3jW3f/storespi17126879-1400x840/v1/t2001x1212.webp",
        
      ]
    },
    {
      name: "Perfume TOMMY HILFIGER",
      description: "Girl Forever.",
      price: 120.000,
      images: [
        "https://cdn11.bigcommerce.com/s-2vt02okold/images/stencil/1280x1280/products/4471/8613/MTOMGF__18919.1756764602.jpg?c=1",
        "https://m.media-amazon.com/images/I/51CC6HzruEL._UF1000,1000_QL80_.jpg"
      ]
    },
    {
      name: "Perfume TOUS",
      description: "Oro Para Dama.",
      price: 220.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_903733-MLU72600392813_102023-O.webp",
        "https://ss701.liverpool.com.mx/xl/42320030.jpg",
    
      ]
    },
    {
      name: "Perfume  TOUS",
      description: "L'Eau.",
      price: 200.000,
      images: [
        "https://cloud-media.tous.com/medias/sys_master/images/sys-master/images/h66/h09/8831523389470/medias-197791061-20170218080554.jpg",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.12066.jpg",
    
      ]
    },
    {
      name: "Perfume TOUS",
      description: " Touch.",
      price: 150.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/fragancia-femenina-tous-touch-fresca-y-delicada.jpg?v=1751059545",
        "https://www.riuparfum.com/990-large_default/tous-touch-eau-de-toilette.jpg",
        
      ]
    }, {
      name: "Perfume VERSACE",
      description: "Bright Crystal Absolu",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/asr/ebce2e6c-869c-4a21-8543-eba092eb9fae.d404da837aeed192909889dea0440769.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        "https://perfumeriaspadilla.es/cdn/shop/files/a57f7cae88d6f890770143c8b6cbc6b1_cefeda76-ba42-4a42-bf58-3d8f0fc67afe.jpg?v=1759591867",
    
      ]
    },
    {
      name: "Perfume VERSACE",
      description: "Bright Crystal",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_981294-MLU79373814809_092024-O.webp",
        "https://media.falabella.com/falabellaCL/80028979_1/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume VERSACE",
      description: "EROS POUR FEMME",
      price: 150.000,
      images: [
        "https://madeira.com.co/cdn/shop/products/8011003823536_1.jpg?v=1610410959",
        "https://static.soyfetiche.com/storage/skus/VS150532.jpg",
       
        
      ]
    },
    {
      name: "Perfume VERSACE",
      description: "DYLAN Blue ",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/versace-pour-femme-dylan-blue-100ml-perfumes-769.webp?v=1713416412",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.47459.jpg",
    
      ]
    },
    {
      name: "Perfume VERSACE",
      description: "DYLAN PURPLE",
      price: 130.000,
      images: [
        "https://oechsle.vteximg.com.br/arquivos/ids/20290643-800-800/imageUrl_1.jpg?v=638721756917070000",
        "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/324886999/variant/images/36a3a6d6-29cb-4114-8a05-77f4332dfe95/324886999-0000-001.jpg",
        
      ]
    },
    {
      name: "Perfume VERSACE",
      description: "DYLAN TURQUOISE",
      price: 130.000,
      images: [
        "https://aromasyrecuerdos.com/wp-content/uploads/2022/10/DYLAN-TURQUOISE-EDT-Gianni-Versace-100ml.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwEcZIHmdPiAx4LCWFETi46irhK_vyUL8hqQ&s",
        
      ]
    },
    {
      name: "Perfume VERSACE",
      description: " red jeans.",
      price: 130.000,
      images: [
        "https://noirperfumeria.co/cdn/shop/files/imagen_2023-05-06_190420720.png?v=1683417864",
        "https://ss701.liverpool.com.mx/xl/1132246854.jpg",
        
      ]
    },
    {
      name: "Perfume VERSACE",
      description: "Versense.",
      price: 130.000,
      images: [
        "https://xelecta.myshopify.com/cdn/shop/files/versence-1_b981cfe2-74f7-424c-814b-353829917f82_300x300.jpg?v=1718389070",
        "https://www.hites.com/dw/image/v2/BDPN_PRD/on/demandware.static/-/Sites-mastercatalog_HITES/default/dw5744b0e7/images/original/pim/922901001/922901001_1.jpg?sw=1000&sh=1000",
        
      ]
    },
    {
      name: "Perfume VERSACE",
      description: "Yellow Diamond.",
      price: 130.000,
      images: [
        "https://megamercancias.com.co/wp-content/uploads/2024/11/Versace-yellow-diamond_1.webp",
        "https://media.falabella.com/falabellaCL/3370075_1/w=1500,h=1500,fit=pad",
        
      ]
    },
     {
      name: "Perfume  VICTORIA SECRET",
      description: "Bombshell",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_624302-MLU70116979046_062023-O.webp",
        "https://cdn.shopify.com/s/files/1/0568/4504/1708/files/Perfume_Bombshell_Victoria_Secret_EDP_envioacasa.co_envio_a_casa_9.webp?v=1736128875" 
      ]
    },
    {
      name: "Perfume VIVA LA JUICY",
      description: " Couture.",
      price: 150.000,
      images: [
        "https://i5.walmartimages.com/asr/7361c991-b850-430a-b41c-d84d1ff15605.e7cf8ffa8ccadd56ce3d5b9ad649993e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        "https://dam.elcorteingles.es/producto/www-001013512318547-00.jpg?impolicy=Resize&width=967&height=1200"
      ]
    },
    {
      name: "Perfume AFNAN",
      description: " 9 PM",
      price: 160.000,
      images: [
        "https://holacompras.com/wp-content/uploads/2024/11/PERF-9PM-EDP100-H-2.jpg",
        "https://m.media-amazon.com/images/I/21gLiPkpiGL.jpg",
        
      ]
    },
    {
      name: "Perfume AFNAN",
      description: "9pm pour femme",
      price: 130.000,
      images: [
        "https://perfumaste.com/wp-content/uploads/2025/01/perfume-afnan-pour-femme.jpg",
        "https://acdn-us.mitiendanube.com/stores/001/071/596/products/arabian-perfume-afnan-9-pm-pour-femme-100ml-eau-de-parfum-afnan-307351-51370333634891_1024x-c9d91a35688fb36aee17223063886092-640-0.jpg",
       
      ]
    },
    {
      name: "Perfume ARSENAL",
      description: "Gilles Cantuel.",
      price: 120.000,
      images: [
        "https://perfumesmundiales.com/wp-content/uploads/2020/09/Perfume-Arsenal.png",
        "https://fimgs.net/mdimg/perfume/o.20203.jpg",
        
      ]
    },
    {
      name: "Perfume ARSENAL",
      description: "Gilles Cantuel RED.",
      price: 120.000,
      images: [
        "https://lorens.com.co/wp-content/uploads/Arsenal-Red-Nuevo-de-Gilles-Cantuel-para-Hombre-100ml.jpeg",
        "https://perfubarranquilla.com/cdn/shop/files/22972122305-2.jpg?v=1724039600&width=1946"
      ]
    },
    {
      name: "Perfume BENELTON",
      description: "Cold.",
      price: 130.000,
      images: [
        "https://m.media-amazon.com/images/I/51DFhSZ2fVL.jpg",
        "https://perfumelovemanila.com/cdn/shop/files/20240919_151312-01_1024x1024@2x.jpg?v=1726800173",
    
      ]
    },
    {
      name: "Perfume  BHARARA",
      description: "BLUE.",
      price: 150.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_859393-MLC49553362310_042022-O.webp",
        "https://fraganciasboutique.com/cdn/shop/files/BHARARA_5_1080x.png?v=1756829650",
    
      ]
    },
    {
      name: "Perfume  BHARARA",
      description: " Niche.",
      price: 150.000,
      images: [
        "https://facescr.vtexassets.com/arquivos/ids/192472-800-auto?v=638624063314570000&width=800&height=auto&aspect=true",
        "https://fraganzi.com/cdn/shop/files/bhararaniche100ml.png?v=1743781783",
        
      ]
    }, 
    {
      name: "Perfume BHARARA",
      description: "King",
      price: 150.000,
      images: [
        "https://www.zafiroperfumeria.com/wp-content/uploads/2024/01/BHARARA-KING.png",
        "https://media.falabella.com/falabellaPE/129315909_02/w=800,h=800,fit=pad",
    
      ]
    },
    {
      name: "Perfume BURBERRY",
      description: "HERO",
      price:150.000,
      images: [
        "https://facescostarica.vtexassets.com/arquivos/ids/164766-800-auto?v=638804267153100000&width=800&height=auto&aspect=true",
        "https://assets.burberry.com/is/image/Burberryltd/8612E57B-A2FA-40E5-8320-99349E996FB1?$BBY_V3_SL_1.275$&wid=581&hei=739",
        
      ]
    },
    {
      name: "Perfume BVLGARI",
      description: "Aqva HOMME",
      price: 120.000,
      images: [
        "https://cdnx.jumpseller.com/matis1/image/66430876/resize/1000/1000?1755063249",
        "https://disfragancias.com/cdn/shop/products/Bvlgari-aqva-2.jpg?v=1699805077",
        
      ]
    },
    {
      name: "Perfume BVLGARI",
      description: "Aqva Marine",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-aqva-marine-bvlgari-eau-de-toilette-100ml-hombre-2944243_300x300.jpg?v=1758672496",
        "https://disfragancias.com/cdn/shop/products/Bvlgari-aqva-2.jpg?v=1699805077",
    
      ]
    },
    {
      name: "Perfume BVLGARI",
      description: "MAN",
      price: 120.000,
      images: [
        "https://cosmetic.cl/cdn/shop/products/PDL1127_800x.png?v=1628602881",
        "https://perfumes.ec/cdn/shop/files/BvlgariMan100ml_f983b363-9f65-415c-b468-8b957ffeea2a.png?v=1721427051",
        
      ]
    },
    {
      name: "Perfume BVLGARI",
      description: " In Black",
      price: 120.000,
      images: [
        "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/01/2386814/1.jpg?9610",
        "https://mundoreloj.com.co/wp-content/uploads/2024/05/Bvlgari-Man-in-Black-02.jpg",
        
      ]
    },
    {
      name: "Perfume BVLGARI",
      description: "BLV.",
      price: 120.000,
      images: [
        "https://www.valsaninc.com/cdn/shop/products/IMG_0185.jpg?v=1591479065&width=1214",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.148.jpg",
        
      ]
    },
    {
      name: "Perfume CALVIN KLEIN",
      description: "CK.",
      price: 120.000,
      images: [
        "https://perfumesmundiales.com/wp-content/uploads/2023/11/perfume-calvin-klein-ck-be-200ml-.png",
        "https://perfumeplanet.com.pa/cdn/shop/products/calvin-klein-ck-be-eau-de-toilette-unisex-200-ml___28.jpg?v=1574745199&width=1445",
        
      ]
    },
    {
      name: "Perfume CALVIN KLEIN",
      description: "EUPHORIA MEN.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_821019-MLU73510058815_122023-O.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_TMnF25_Avyek3bYIpMoAVRYDCFXTt-z-PpRHLLRJ2en6xj2FntfZuK_L_Ya39nvNJr4&usqp=CAU",
        
      ]
    },
        {
      name: "Perfume CALVIN KLEIN",
      description: "ETERNITY.",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/perfume-calvin-klein-eternity-for-men-100ml-perfumes-157.webp?v=1719023697",
        "https://perfumeskuwait.com/wp-content/uploads/5A-1.jpg" 
      ]
    },
    {
      name: "Perfume CALVIN KLEIN",
      description: "Ck Free.",
      price: 120.000,
      images: [
        "https://www.perfumenvio.com/media/catalog/product/cache/1/image/265x/9df78eab33525d08d6e5fb8d27136e95/c/k/ck-free-for-men-edt-calvin-klein_1.jpg",
        "https://static.dafiti.com.co/p/calvin-klein-2117-3892651-2-zoom.jpg"
      ]
    },
    {
      name: "Perfume CALVIN KLEIN",
      description: "CK All",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/asr/518763c9-1cc2-40fe-b13a-886631ff89d9.932a68c0b3b9876c55e32dc71aff3b76.jpeg",
        "https://m.media-amazon.com/images/I/51Ukjd-UN9L._SL1500_.jpg",
        
      ]
    },
    {
      name: "Perfume CALVIN KLEIN",
      description: "CK In 2u.",
      price: 120.000,
      images: [
        "https://madeira.com.co/cdn/shop/products/088300196937_1_eb62d4a7-ee53-459f-8a30-d8d1af169ec2.jpg?v=1609889649",
        "https://media.falabella.com/falabellaCO/44971279_1/w=800,h=800,fit=pad",
       
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "CH MEN.",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/asr/4e992c5c-d311-451d-82ee-477a65f60b13.53cc906a27996a49bc320496d1984f3d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF&format=avif",
        "https://getthelookar.vtexassets.com/arquivos/ids/155983-800-auto?v=637245392984230000&width=800&height=auto&aspect=true",
        
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "Bad Boy",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/asr/5ce05405-707c-471c-a5c6-a5625586bef5.364de5cd072267505dd809906954b957.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        "https://facescr.vtexassets.com/arquivos/ids/181721-800-auto?v=638210578375600000&width=800&height=auto&aspect=true"
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "FOR MEN.",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/carolina-herrera-for-men-tradicional-hombre-100-ml-perfumes-567.webp?v=1713421172",
        "https://www.anikashop.com.ar/product_images/h/307/40793__18866_zoom.jpg",
    
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "212 Vip Black.",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/61pjEdHqy9L._UF1000,1000_QL80_.jpg",
        "https://www.druni.es/media/catalog/product/1/9/1921.jpg",
    
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: " Herrera 212 VIP MEN.",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/asr/0c0402a6-84c1-4349-9adb-867f6a68aa64.dd35aae33f8ac3f2bb4ef6e704695cfb.jpeg?odnHeight=264&odnWidth=264&odnBg=FFFFFF",
        "https://envioacasa.com.co/cdn/shop/files/Perfume_Carolina_Herrera_212_Vip_Men_Hombre_100_ml_EDT_ENVIOACASA.CO_ENVIO_A_CASA_14.jpg?v=1749504087&width=1445",
        
      ]
    }, {
      name: "Perfume CAROLINA HERRERA",
      description: " 212 Sexy",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_701089-MLA80335254291_102024-O.webp",
        "https://www.perfumecenter.com.mx/cdn/shop/products/8411061604588_507a4821-41e4-4281-b8dc-3ad1025cc6ec.jpg?v=1602237353",
    
      ]
    },
    {
      name: "Perfume CAROLINA HERRERA",
      description: "212 VIP MEN WILD PARTY",
      price: 120.000,
      images: [
        "https://luxurybeautyest.com/cdn/shop/products/212.png?v=1660064269",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bLoeIPUVHMEbp-hYmMEBgDq3G-0buBVXRpoavwN2fblHADMRuTKcYhB-8zimSwNfEkw&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume CARTIER",
      description: "Declaration",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/perfume-cartier-declaration-100-ml-3-4-oz-perfumes-670.webp?v=1728597839",
        "https://m.media-amazon.com/images/I/81jWpvnMetL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume CARTIER",
      description: "Declaration essence",
      price: 120.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/declaration_essence.webp?v=1731976189&width=1445",
        "https://disfragancias.com/cdn/shop/products/Cartier-declaration-essence-2.jpg?v=1699805140",
    
      ]
    },
    {
      name: "Perfume CARTIER",
      description: "Eau De Toilette Unisex",
      price: 120.000,
      images: [
        "https://deperfumes.co/wp-content/uploads/2024/10/perfume-parar-hombre-y-mujer-eau-de-cartier-100-ml-edt-tienda_jr-1.jpg",
        "https://emporiodutyfree.com/wp-content/uploads/2017/08/EAU-DE-CARTIER-200ML-UNISEX-B.jpg",
        
      ]
    },
    {
      name: "Perfume CARTIER",
      description: "PASHA",
      price: 120.000,
      images: [
        "https://perfumesymarcas.com/wp-content/uploads/2022/08/Perfume-Pasha-De-Cartier-Para-Hombre-100-ml.jpg",
        "https://abscents.com.mx/cdn/shop/files/43186347_x1_aee6ad81-2197-4f33-a114-5aeab5d8f0de.jpg?v=1686089344&width=1080",
        
      ]
    },
    {
      name: "Perfume CARTIER",
      description: "Santos.",
      price: 120.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/perfume_santos_de_cartier_original_100ml.jpg?v=1731945691",
        "https://i5.walmartimages.com/asr/b2786d14-6245-48f1-960d-10894a79167e.e30e09caafb7e5ddf96fe202f88eddfd.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        
      ]
    },
    {
      name: "Perfume CARTIER",
      description: "Santos Concentree",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-santos-concentree-cartier-100ml-hombre-eau-de-toilette-5601860_grande.jpg?v=1758670221",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHVnNzgshsPpgfp4u2TCvmoaH7qgmlgkCC2jrZPI_qi4YKhLsv2N8xDcMGX1Kv0a4G0jI&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume CHANEL",
      description: "ALLURE HOMME.",
      price: 120.000,
      images: [
        "https://images-cdn.ubuy.com.pa/635ff7cfa7758724fe1ba478-chanel-allure-homme-men-cologne.jpg",
        "https://images-cdn.ubuy.ae/637cd4bbac0387645a0fe19b-chanel-allure-homme-eau-de-toilette-for.jpg",
      ,
        
      ]
    },
     {
      name: "Perfume CHANEL",
      description: "Allure Homme Sport .",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/seo/Allure-Homme-Sport-Eau-Extreme-by-Chanel-Eau-De-Parfum-Spray-5-oz_34fc30a8-5bc2-42ab-b60e-9bb15c6c6f64.491c6027cb3db18c9aa4c837ffe1e22c.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfKnQGWYDFdvAmYVq4VYBJTqepq3t95CWOSQhgy5RBhg-qzeyPJj9V_noo-4UzXnY93jQ&usqp=CAU" 
      ]
    },
    {
      name: "Perfume CHANEL",
      description: "BLUE.",
      price: 120.000,
      images: [
        "https://exitocol.vtexassets.com/arquivos/ids/23601510/perfume-chanel-bleu-100-ml-men.jpg?v=638563948593770000",
        "https://dam.elcorteingles.es/producto/www-001013513506470-00.jpg?impolicy=Resize&width=967&height=1200"
      ]
    },
    {
      name: "Perfume CHRISTIAN DIOR",
      description: "Fahrenheit",
      price: 120.000,
      images: [
        "https://facescr.vtexassets.com/arquivos/ids/167339-800-auto?v=637584309150830000&width=800&height=auto&aspect=true",
        "https://m.media-amazon.com/images/I/81EsIfMtSpL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume CREED",
      description: " Aventus.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_791676-MLA81494962555_122024-O.webp",
        "https://images-cdn.ubuy.com.co/6359d9570fabf911d241d447-creed-aventus-4oz-men-039-s-eau-de.jpg",
       
      ]
    },
    {
      name: "Perfume CREED",
      description: "Green Irish Tweed",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_765522-MLV83032529203_032025-O.webp",
        "https://cdn.awsli.com.br/600x700/1547/1547174/produto/59429864d0b37efe99.jpg",
        
      ]
    },
    {
      name: "Perfume CREED",
      description: "Millésime Impérial.",
      price: 120.000,
      images: [
        "https://ss701.liverpool.com.mx/xl/1113599053.jpg",
        "https://creedboutique.mx/cdn/shop/files/1500x1500_MI.jpg?v=1747669474"
      ]
    },
    {
      name: "Perfume CREED",
      description: "Vetiver.",
      price: 120.000,
      images: [
        "https://luxurybeautyest.com/cdn/shop/products/CREED.jpg?v=1660271032",
        "https://www.zonaperfumes.cl/wp-content/uploads/Perfume-Creed-Original-Vetiver-EDP-Unisex.jpg",
    
      ]
    },
    {
      name: "Perfume CREED",
      description: " Royal Water.",
      price: 120.000,
      images: [
        "https://cdn.valmara.co/58353-large_default/perfume-para-hombre-mujeres-royal-water-de-creed-120-ml-edp.webp",
        "https://emporiodutyfree.com/wp-content/uploads/2022/01/Perfume-royal-water-Creed-eau-de-parfum-hombre-100-Ml.jpg-B.jpg",
    
      ]
    },
    {
      name: "Perfume CHRISTIAN DIESEL",
      description: "otb.",
      price: 120.000,
      images: [
        "https://media.falabella.com/falabellaPE/18958381_2/w=800,h=800,fit=pad",
        "https://pilatos21.vtexassets.com/arquivos/ids/612700-800-800?v=637625031750770000&width=800&height=800&aspect=true",
        
      ]
    }, {
      name: "Perfume DIESEL",
      description: " ONLY THE BRAVE TATOO",
      price: 130.000,
      images: [
        "https://www.samparfums.es/41071-large_default/diesel-only-the-brave-tatoo-eau-de-toilette.jpg",
        "https://i1.perfumesclub.com/media/35813.jpg",
    
      ]
    },
    {
      name: "Perfume DIESEL",
      description: "Zero Plus",
      price:130.000,
      images: [
        "https://madeira.com.co/cdn/shop/products/4085400272000_1.jpg?v=1647312073",
        "https://perfumaste.com/wp-content/uploads/2025/01/Perfume-Zero-Plus-Diesel-Para-Mujer-75-ml-FRASCO.jpg",
        
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: "Intenso",
      price: 10.000,
      images: [
        "https://exdtvcqvfop.exactdn.com/wp-content/uploads/2021/03/Intenso-de-Dolce-Gabbana-hombre-125ml.jpg?strip=all&lossy=1&ssl=1",
        "https://dam.elcorteingles.es/producto/www-001013513504301-00.jpg?impolicy=Resize&width=967&height=1200",
        
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: "Light Blue",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/files/Light-Blue-Caballero.jpg?v=1754687187",
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2022/02/Dolce-Gabbana-Light-Blue-hombre.png",
    
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: " Light Blue Eau Intense",
      price: 120.000,
      images: [
        "https://m.media-amazon.com/images/I/61I+VvkSrZL.jpg",
        "https://sensesrd.com/5876-thickbox_default/light-blue-eau-intense-pour-homme-eau-de-parfum-.jpg",
        
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: "Pour Homme",
      price: 120.000,
      images: [
        "https://emporiodutyfree.com/wp-content/uploads/2019/08/DG-Pour-homme-125ml-DG-Hombre-M-780x780.jpg",
        "https://emporiodutyfree.com/wp-content/uploads/2019/08/DOLCE-GABBANA-POUR-HOMME-EDT-125-ML-HOMBRE-B.jpg",
        
      ]
    },
    {
      name: "Perfume DOLCE & GABBANA",
      description: "The One.",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/products/DolceGabbanaTheOneforMen.jpg?v=1649532384",
        "https://ss701.liverpool.com.mx/xl/1040733716.jpg",
        
      ]
    },
    {
      name: "Perfume  GIORGIO ARMANI",
      description: "CODE PROFUMO.",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf77Mo0cI7WTfQOEJBZHz2Kt4nh8ePIkFUKx6CBYfWfCBdPGNhIZGrl0BmIGkXH-oPc0o&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZfZJ0tHWPn-7neA-EJMg7Vae3aL0Nl891jEH3e_NP2esOR7D4W3k_Ew9jOpGa57A5580&usqp=CAU",
        
      ]
    },
    {
      name: "Perfume  GIORGIO ARMANI",
      description: "Stronger With You.",
      price: 120.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2023/02/ONLY.jpg",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/l/5/l5617100_1.png",
        
      ]
      },
    {
      name: "Perfume HUGO BOSS",
      description: "BOTTLED SPORT.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_992777-MLA83102333998_032025-O.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6N1SGkftdGLsVh4bLqFSgaeECIBDcadPIGZlhTgVQEysBLa9EmCNcag_Hm4ElpOgomw&usqp=CAU",
        
      ]
      
    },
   {
      name: "Perfume HUGO BOSS",
      description: "Unlimited.",
      price: 120.000,
      images: [
        "https://chedrauimx.vtexassets.com/arquivos/ids/54334041-800-auto?v=638932142656700000&width=800&height=auto&aspect=true",
        "https://http2.mlstatic.com/D_NQ_NP_956336-MLU73453771063_122023-O.webp",
        
      ]
      
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Tonic.",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-boss-bottled-tonic-eau-de-toilette-100ml-hombre-9183047_grande.jpg?v=1758672354",
        "https://cdn.notinoimg.com/detail_main_lq/hugo-boss/8005610255668_01-o/boss-bottled-tonic___250318.jpg",
        
      ]
      
    },
    {
      name: "Perfume HUGO BOSS",
      description: " Dark Blue .",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_643076-MLA79589566493_092024-O.webp",
        "https://i5.walmartimages.com/seo/Hugo-Boss-Dark-Blue-Eau-De-Toilette-Spray-Cologne-for-Men-2-5-Oz_d8a849a0-5aed-4afc-a1e9-02cab8c652fd.2877f335a218f12da68955160bc2cbbd.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        
      ]
      
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Energise.",
      price: 120.000,
      images: [
        "https://perfumaste.com/wp-content/uploads/2025/01/perfume-hugo-boss-energise-para-hombre-75ml.jpg",
        "https://m.media-amazon.com/images/I/61ekToBQzKL._AC_UF1000,1000_QL80_.jpg",
        
      ]
      
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Element.",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/seo/Hugo-Boss-Element-EDT-SP-3-Oz_b1eb2b6e-e93a-406c-91d3-db2ef2a2c0cd_1.ec06774628d46fb2a008efc8f671836c.jpeg",
        "https://disfragancias.com/cdn/shop/products/Hugo-element.jpg?v=1699805940",
        
      ]
      
    },
    {
      name: "Perfume HUGO BOSS",
      description: " In Motion.",
      price: 120.000,
      images: [
        "https://detqhtv6m6lzl.cloudfront.net/HCLContenido/producto/FullImage/737052852034-1.jpg",
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2022/10/PERFUMES-2025-03-04T161759.141.png",
        
      ]
      
    },
    {
      name: "Perfume HUGO BOSS",
      description: "Orange.",
      price: 120.000,
      images: [
        "https://www.chileperfume.cl/wp-content/uploads/2024/11/hugo-boss-boss-orange-100ml-edt-hombre-a9de43fb-cefa-4f5c-977e-57c150bcd702.jpg",
        "https://down-id.img.susercontent.com/file/b9867e45aa4ccc43ad5752bcb15ab2d9",
        
      ]
      
    },
    {
      name: "Perfume HUGO BOSS",
      description: "XY.",
      price: 120.000,
      images: [
        "https://cdn5.coppel.com/mkp/10302059-1.jpg",
        "https://i5.walmartimages.com/seo/XY-By-Hugo-Boss-Eau-De-Toilette-Spray-for-Men-3-3-oz-Pack-of-2_2f35b9da-b84e-49e7-91f4-b54013c8a70d_1.041bbde172c049a14105788a36368cca.jpeg",
        
      ]
      
    },
    {
      name: "Perfume ISSEY MIYAKE",
      description: " L'eau d'issey Pour Homme.",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1jnGrEaZ88RdtCgNm4Ee9BrzimOHE9U4uRD67GNFAOK-NozedoSbS2VnJn6R5D2xTDjI&usqp=CAU",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.721.jpg",
        
      ]
      
    },
    {
      name: "Perfume ISSEY MIYAKE",
      description: "INTENSE.",
      price: 130.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2022/12/PERFUME-LEAU-DISSEY-INTENSE-100ML-HOMBRE-EAU-DE-TOILETTE.jpg",
        "https://media.falabella.com/falabellaCL/2003191_1/w=1500,h=1500,fit=pad",
        
      ]
      
    },
    {
      name: "Perfume ISSEY MIYAKE",
      description: "L'Eau D'Issey Pour Homme Sport.",
      price: 120.000,
      images: [
        "https://rougeb2car.vtexassets.com/arquivos/ids/240105-800-auto?v=638889802614300000&width=800&height=auto&aspect=true",
        "https://perfumes.ec/cdn/shop/files/IsseyMiyakeL_EauD_IsseyPourHommeSport100ml.png?v=1708810020",
        
      ]
      
    },
    {
      name: "Perfume JEAN PASCAL",
      description: "JP.",
      price: 130.000,
      images: [
        "https://www.jeanpascal.com/wp-content/uploads/2021/09/LADO1_Mesa-de-trabajo-1-01-300x300.jpg",
        "https://m.media-amazon.com/images/I/519OTeObjzL._UF350,350_QL80_.jpg",
        
      ]
      
    },
    {
      name: "Perfume JEAN PAUL",
      description: " Le Male.",
      price: 130.000,
      images: [
        "https://perfumaste.com/wp-content/uploads/2025/01/Perfume-Le-Male-De-Jean-Paul-Gaultier-Para-Hombre-125-ml-600x600.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVDz2KCqo36xPUMGI5HBuSlqlYlB80P8_Lu2JDL10bjqiPI1qvZjUh6l0YEjBgft_f5g&usqp=CAU",
        
      ]
      
    },
    {
      name: "Perfume JEAN PAUL",
      description: " Le Male.",
      price: 130.000,
      images: [
        "https://www.aurumessenze.it/cdn/shop/products/lemalle_9fc06f57-500f-41f3-a2f4-7e4ed3dc6f23.jpg?v=1663592835&width=1600",
        "https://212global.com/wp-content/uploads/2024/03/65c4e48e0998dbc3f3fe43c3_thumbnail-600x600.png",
        
      ]
      
    },
    {
      name: "Perfume JEAN PAUL",
      description: "Ultra Male.",
      price: 130.000,
      images: [
        "https://cdn11.bigcommerce.com/s-2vt02okold/images/stencil/1280x1280/products/2850/2802/HJEAPGU__95132.1731099884.jpg?c=1",
        "https://media.falabella.com/falabellaCL/4703697_1/w=800,h=800,fit=pad",
        
      ]
      
    },
    {
      name: "Perfume JEAN PAUL",
      description: "Scandal.",
      price: 130.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRgDXtohWmcA5XBkKh67nt9PkV3iJFqHJNzQ&s",
        "https://http2.mlstatic.com/D_NQ_NP_887351-MLA47931832699_102021-O.webp",
        
      ]
      
    },
    {
      name: "Perfume  LACOSTE",
      description: "ESSENTIAL.",
      price: 120.000,
      images: [
        "https://resources.claroshop.com/medios-plazavip/mkt/62abce3ecbd17_lacoste-essential-edt-125mljpg.jpg",
        "https://m.media-amazon.com/images/I/61zs8hKNL-L._UF1000,1000_QL80_.jpg",
        
      ]
      
    },
    {
      name: "Perfume  LACOSTE",
      description: "Challenge.",
      price: 120.000,
      images: [
        "https://bixoto.com/media/catalog/product/cache/2e45ba69d70625e0fc47dbc2d34862e1/0/7/0737052248097_0_P02.jpg",
        "https://m.media-amazon.com/images/I/41AYnbjU4AL._UF1000,1000_QL80_.jpg",
        
      ]
      
    },
    {
      name: "Perfume LACOSTE",
      description: "Red Pour.",
      price: 120.000,
      images: [
        "https://perfumescolombia.com.co/cdn/shop/files/lacoste-red-100ml-edt-11-premium-2571405.png?v=1751884104",
        "https://http2.mlstatic.com/D_NQ_NP_874190-MLU52832609626_122022-O.webp",
        
      ]
      
    },
    {
      name: "Perfume MONT BLACK",
      description: "INDIVIDUEL.",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVKsu_CsGA54Xsg-_jdByQhOQ9PyxMF7S5A&s",
        "https://exdtvcqvfop.exactdn.com/wp-content/uploads/Individuel-de-Mont-Blanc-para-hombre-botella.jpg?strip=all&lossy=1&ssl=1",
        
      ]
      
    },
    {
      name: "Perfume MONT BLACK",
      description: " LEGEND.",
      price: 120.000,
      images: [
        "https://ohlalafragancia.com/wp-content/uploads/2025/04/Perfume-Mont-Blanc-Legend.png",
        "https://dam.elcorteingles.es/producto/www-001013513301609-00.jpg?impolicy=Resize&width=967&height=1200",
        
      ]
      
    },
    {
      name: "Perfume MONT BLACK",
      description: "Legend Night.",
      price: 120.000,
      images: [
        "https://www.perfumecenter.com.mx/cdn/shop/products/3386460087940.jpg?v=1613701839",
        "https://m.media-amazon.com/images/I/71nI-zZPj1L._UF350,350_QL80_.jpg",
        
      ]
      
    },
    {
      name: "Perfume MONT BLACK",
      description: "Legend Spirit.",
      price: 120.000,
      images: [
        "https://cdn11.bigcommerce.com/s-2vt02okold/images/stencil/1280x1280/products/2869/3927/HMONBLS__72244.1731099887.jpg?c=1",
        "https://siman.vtexassets.com/arquivos/ids/323089-800-800?v=637250587807070000&width=800&height=800&aspect=true",
        
      ]
      
    },
    {
      name: "Perfume MONT BLACK",
      description: "Legend Red.",
      price: 120.000,
      images: [
        "https://static.beautytocare.com/media/catalog/product/m/o/montblanc-legend-red-eau-de-parfum-100ml_1_1.jpg",
        "https://cdn.basler-beauty.de/out/pictures/generated/product/1/980_980_100/1436600-Montblanc-Legend-Red-Eau-de-Parfum-100-ml.7e9072f9.jpg",
        
      ]
      
    },
    {
      name: "Perfume MONT BLACK",
      description: " Presence.",
      price: 120.000,
      images: [
        "https://exdtvcqvfop.exactdn.com/wp-content/uploads/Presence-de-Mont-Blanc-hombre-edt-75ml.jpg?strip=all&lossy=1&ssl=1",
        "https://i1.perfumesclub.com/media/14081.jpg",
        
      ]
      
    },
    {
      name: "Perfume MONT BLACK",
      description: " Starwalker.",
      price: 120.000,
      images: [
        "https://cdn.fragrancenet.com/images/photos/600x600/141223.jpg",
        "https://fraganciasboutique.com/cdn/shop/files/MONT_1_81b1a10a-38d4-4317-a490-0b4e953cfe9b_1080x.png?v=1756830162",
        
      ]
      
    },
    {
      name: "Perfume MONTALE",
      description: "Aoud Flowers.",
      price: 130.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/perfume-aoud-flowers-montale-hombre-100ml-edp.webp?v=1758991783",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.3239.jpg",
        
      ]
      
    },
    {
      name: "Perfume MONTALE",
      description: " Aoud Forest.",
      price: 130.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2023/01/aoud-forest-300x300.jpg",
        "https://maisonniche.cl/1848-catalog_large/montale-aoud-musk-edp-100-ml.jpg",
        
      ]
      
    },
    {
      name: "Perfume MONTALE",
      description: "Aoud Night.",
      price: 130.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2022/02/rose-night-montale_1024x1024@2x.jpg",
        "https://deperfumes.co/wp-content/uploads/2024/10/perfume-unisex-vetiver-patchouli-de-montale-100-ml-edp-tiendasjr-1.jpg",
        
      ]
      
    },
    {
      name: "Perfume MONTALE",
      description: " Velvet Flowers.",
      price: 130.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-montale-velvet-flowers-eau-de-parfum-100ml-mujer-7981328_300x300.jpg?v=1758670733",
        "https://cdn.perfumeriacomas.com/media/catalog/product/cache/22f64930b43406e7f6aff7e6bbdba240/1/0/101672-MONTALE_VELVET_FLOWERS_EPV_100ML_1.png",
        
      ]
      
    },
    {
      name: "Perfume MONTALE",
      description: "Day Dreams.",
      price: 130.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/montale-paris-day-dreams-100-ml-perfumes-689.webp?v=1713418161",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.45055.jpg",
        
      ]
      
    },
    {
      name: "Perfume NAUTICA",
      description: "Voyage.",
      price: 120.000,
      images: [
        "https://cdnx.jumpseller.com/encanto-store/image/4416744/resize/1200/630?1637895507",
        "https://m.media-amazon.com/images/I/51S3W4tnDbL._SL1500_._SX1200_.jpg",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: "BLACK XS.",
      price: 120.000,
      images: [
        "https://luxurybeautyest.com/cdn/shop/products/paco-rabanne-black-xs.jpg?v=1660271002",
        "https://http2.mlstatic.com/D_NQ_NP_978417-MLU75640639155_042024-O.webp",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: "BLACK XS LAPHRODISIAQUE.",
      price: 120.000,
      images: [
        "https://cdn1.totalcommerce.cloud/laplazamorada/product-image/es/perfume-paco-rabanne-_-black-xs-laphrodisiaque-eau-de-toilette-100ml-_-hombre-1.webp",
        "https://www.lessenceperfumeria.com/cdn/shop/files/BLACKAPHRO.jpg?v=1728356505",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Black Xs L'exces.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_895941-MLV77857482739_072024-O.webp",
        "https://m.media-amazon.com/images/I/51vgtEI3CWL._UF1000,1000_QL80_.jpg",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: " Black Xs.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_990507-MLV52366876197_112022-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_630463-MLA45188087898_032021-O.webp",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: " Aqua.",
      price: 120.000,
      images: [
        "https://perfumaste.com/wp-content/uploads/2025/01/Perfume-Invictus-Aqua-De-Paco-Rabanne-Para-Hombre-100-ml.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_684044-MLU54982298876_042023-O.webp",
        
      ]
      
    },
    {
      name: "Perfume  PACO RABANNE",
      description: "PLATINUM.",
      price: 120.000,
      images: [
        "https://joyeriaitaliana.co/cdn/shop/files/s-l400_0e86cc29-5131-4315-8f6c-331b9e10c85f.jpg?v=1730405255",
        "https://cdnx.jumpseller.com/la-perfumeria-cl/image/32143408/resize/540/540?1676746478",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: "Onyx.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_625525-MLM43646210962_102020-O.webp",
        "https://fimgs.net/mdimg/perfume-thumbs/375x500.58872.jpg",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: "One Million Elixir.",
      price: 130.000,
      images: [
        "https://emporiodutyfree.com/wp-content/uploads/2022/11/perfume-one-million-elixir-paco-rabanne-hombre-100ml.jpg",
        "https://www.eliteperfumes.cl/cdn/shop/files/paco-rabanne-53121003553138.jpg?v=1733438405&width=1214",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: "One Million Lucky.",
      price: 130.000,
      images: [
        "https://cdn.fragrancenet.com/images/photos/900x900/316076.jpg",
        "https://fandi-perfume.com/cdn/shop/products/INVICTUSLUCKY_1080x.jpg?v=1659115837",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: "One Million Parfum.",
      price: 130.000,
      images: [
        "https://chapurmx.vtexassets.com/arquivos/ids/410067-800-auto?v=638642907801970000&width=800&height=auto&aspect=true",
        "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2025/09/nuoc-hoa-nam-paco-rabanne-one-million-parfum-100ml-68ca56bd84cc7-17092025133541.jpg",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: "One Million Prive.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_853213-MLU72983553563_112023-O.webp",
        "https://m.media-amazon.com/images/I/51PdFED7JxL._UF894,1000_QL80_.jpg",
        
      ]
      
    },
    {
      name: "Perfume PACO RABANNE",
      description: "One Million Royal.",
      price: 130.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlDsfcecw-UfqzW92QBx3L1WqStOtCu53T6MkTZb0twFFBptnjaOv3nxejVXpqBq7ZQo&usqp=CAU",
        "https://www.perfumeriatodo.com.uy/images/virtuemart/product/65190440.jpg",
        
      ]
      
    },
    {
      name: "Perfume PERFUM DE MARLY",
      description: "Layton .",
      price: 140.000,
      images: [
        "https://fraganceroscolombia.com.co/wp-content/uploads/2024/07/layton-exclusif-perfume-300x300.jpeg",
        "https://www.elpalaciodehierro.com/on/demandware.static/-/Sites-palacio-master-catalog/default/dw00ed9fda/images/41649815/large/41649815_x1.jpg",
        
      ]
      
    },
    {
      name: "Perfume PERFUM DE MARLY",
      description: "Kalan.",
      price: 140.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/Kalan-Parfums-De-Marly-125ml.jpg?v=1718312945",
        "https://www.bluesalon.com/cdn/shop/files/PDM121PER00103.jpg?v=1731306739",
        
      ]
      
    },
    {
      name: "Perfume 360 GRADOS DE PERRY ELLIS",
      description: "RED.",
      price: 120.000,
      images: [
        "https://www.mueblesamerica.mx/img/1024/1024/resize/P/E/PERY00004_x1.jpg",
        "https://perfumaste.com/wp-content/uploads/2025/01/Perfume-360-Red-De-Perry-Ellis-Para-Hombre-100-ml-Frasco.jpg",
        
      ]
      
    },
    {
      name: "Perfume 360 GRADOS DE PERRY ELLIS",
      description: "200 Ml.",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh2j5BixeY25aM9CHqMiaZw2sX1UfnpMY2ow&s",
        "https://static.dafiti.com.co/p/perry-ellis-2856-4682651-2-zoom.jpg",
        
      ]
      
    },
    {
      name: "Perfume POLO",
      description: " Black.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_744585-MLA47620118596_092021-O.webp",
        "https://m.media-amazon.com/images/I/61gqe7Ba-HL._UF894,1000_QL80_.jpg",
        
      ]
      
    },
    {
      name: "Perfume POLO",
      description: "Ralph Lauren BLUE.",
      price: 120.000,
      images: [
        "https://cachi.uy/wp-content/uploads/Perfume_Ralph_Lauren_Polo_Blue_edt_125ml_Original_3.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHsODIO0Eb4WVQbi76JjB3qumbzODYAI2Cxy2f22ftePD1GuhDuHhh-glsPAx-lT719n8&usqp=CAU",
        
      ]
      
    },
    {
      name: "Perfume POLO",
      description: "Ralph Lauren RED.",
      price: 120.000,
      images: [
        "https://sensesrd.com/6768-large_default/polo-red-eau-de-toilette-.jpg",
        "https://cdn.perfumeriacomas.com/media/catalog/product/cache/97842914a5d8d40f4567b58ffda423ea/5/2/52591-RALPH_LAU_POLO_RED_ETV_125ML_1.png",
        
      ]
      
    },
    {
      name: "Perfume TED LAPIDUS",
      description: " Lapidus.",
      price: 120.000,
      images: [
        "https://essenzaperfumes.cr/wp-content/uploads/2019/11/88984857-01.jpg",
        "https://epocacosmeticos.vteximg.com.br/arquivos/ids/333802-800-800/lapidus-pour-homme-eau-de-toilette-ted-lapidus-perfume-masculino-100ml.jpg?v=636918766550100000",
        
      ]
      
    },
    {
      name: "Perfume TERRE D HERMES",
      description: "Eau de Toilette.",
      price: 120.000,
      images: [
        "https://perfumeplanet.com.pa/cdn/shop/products/image_5dd4e25f-ba83-4210-9b2f-e6768c43f83e.webp?v=1661542955",
        "https://ss701.liverpool.com.mx/xl/78267496.jpg",
        
      ]
      
    },
    {
      name: "Perfume TOMMY",
      description: "TOMMY GIRL.",
      price: 120.000,
      images: [
        "https://www.blueperfumeria.com/cdn/shop/products/Tommy_Girl_Tommy_Hilfiger_f6b9438b-18da-424e-85fe-ee715443cd0d_1000x.jpg?v=1697653842",
        "https://media.falabella.com/falabellaPE/19609917_001/w=1500,h=1500,fit=pad",
        
      ]
      
    },
    {
      name: "Perfume VERSACE",
      description: "Dylan Blue.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_862172-MLA84482063233_052025-O.webp",
        "https://facescr.vtexassets.com/arquivos/ids/202487-800-auto?v=638840391569200000&width=800&height=auto&aspect=true",
        
      ]
      
    },
      {
      name: "Perfume VERSACE",
      description: "Eau Fraiche.",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/asr/81905faa-1dea-45d7-8196-1c1d728643ee.80f647fd9871021bd8db0eb7f78779fd.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        "https://media.falabella.com/falabellaCO/4197427_1/w=800,h=800,fit=pad",
        
      ]
      
    },
    {
      name: "Perfume VERSACE",
      description: " Pour Homme.",
      price: 120.000,
      images: [
        "https://i5.walmartimages.com/asr/a5887492-5876-4b07-9d64-6fd16eefbcb8.9ed0ccb4c1cce7717d9057d5be10cd41.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        "https://photos6.spartoo.es/photos/123/12392975/12392975_1200_A.jpg",
        
      ]
      
    },
    {
      name: "Perfume VERSACE",
      description: "The Dreamer.",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-the-dreamer-versace-100ml-hombre-eau-de-toilette-1468767_2048x.jpg?v=1758670033",
        "https://perfumes24h.com/static/imagenes/productos/shop_2022/img36-1.webp",
        
      ]
      
    },
    {
      name: "Perfume VERSACE",
      description: "Blue Jeans.",
      price: 120.000,
      images: [
        "https://myevastore.com/cdn/shop/products/perfume-blue-jeans-versace-para-hombre-edt-797280.jpg?v=1661800802",
        "https://www.druni.es/media/catalog/product/1/6/1606085.jpg?quality=80&fit=bounds&height=700&width=700&canvas=700:700",
        
      ]
      
    },
    {
      name: "Perfume VIKTOR & ROLF",
      description: "SPICEBOMB.",
      price: 120.000,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTtxVvIRmJekPs8qVcZsOOdWq4ls6S04uBzcQkSRmi7UjLXZojaiwMeRN-9rQJGLb9Ho&usqp=CAU",
        "https://joystore.com.co/wp-content/uploads/2025/02/PERFUME-VIKTOR-ROLF-SPICEBOMB-150ML-FRASCO.jpg",
        
      ]
      
    },
    {
      name: "Perfume VIKTOR & ROLF",
      description: "SPICEBOMB.",
      price: 120.000,
      images: [
        "https://puntotienda.com.py/wp-content/uploads/2023/02/1582.webp",
        "https://m.media-amazon.com/images/I/61SGjKNZT0L._SL1500_.jpg",
        
      ]
      
    },
    {
      name: "Perfume VIKTOR & ROLF",
      description: "Spicebomb Night Vision.",
      price: 120.000,
      images: [
        "https://i5.walmartimages.cl/asr/1e06090e-ea8b-4cd5-938d-ddf97bd4e16f.e7e5ce7ec203231673bcdbf845496bee.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        "https://i5.walmartimages.com/asr/ee7b7de6-3278-4443-998f-2ba5c5b00cb8.3c33a50154548e64d26852d7de3cf428.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        
      ]
      
    },
                                                                                                                                                     
  ];

  products.forEach(p => {
    stmt.run(p.name, p.description, p.price, JSON.stringify(p.images));
  });

  stmt.finalize();
  console.log("✅ Productos insertados con múltiples imágenes.");
});

db.close(() => {
  console.log("✅ Base de datos inicializada con perfumes e imágenes (archivo database.sqlite)");
});
