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
      name: "Perfume Orientica",
      description: "Amber Rouge.",
      price: 120.000,
      images: [
        "https://static.dafiti.com.co/p/al-haramain-8929-0406012-1-zoom.jpg",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/o/r/orientica_amber_rouge_for_woman_edp_80ml_2.png" 
      ]
    },
    {
      name: "Perfume Orientica",
      description: " Royal Amber.",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/products/OrienticaRoyalAmber.jpg?v=1650574772",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbvC8TGFMPpjsrMCbELvJuXXYGLKro1yNxNEzJNbkgwPoN6od_wiO_1JAiwP55D8b__8&usqp=CAU"
      ]
    },
    {
      name: "Perfume Orientica",
      description: " Velvet Gold",
      price: 120.000,
      images: [
        "https://cdn.valmara.co/54128-large_default/perfume-unisex-orientica-velvet-gold-de-al-haramain-80-ml-edp.webp",
        "https://altaperfumeriashop.com/cdn/shop/files/ORIENTICAVELVETGOLD.jpg?v=1709009611",
        
      ]
    },
    {
      name: "Perfume Orientica",
      description: " Amber Noir.",
      price: 120.000,
      images: [
        "https://cdn5.coppel.com/mkp/10303279-1.jpg",
        "https://ss701.liverpool.com.mx/xl/1141418340.jpg",
       
      ]
    },
    {
      name: "Perfume Moschino",
      description: " TOY Boy.",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/products/MoschinoToyBoy.webp?v=1650422113",
        "https://perfumeriasvalencia.com/static/imagenes/productos/shop_2022/phpD5SRXL_659.webp",
        
      ]
    },
    {
      name: "Perfume Moschino",
      description: " TOY 2 PEARL.",
      price: 120.000,
      images: [
        "https://static.wixstatic.com/media/4ccbae_a5fed166eea04130ac5f77b9b10ff9f5~mv2.jpg/v1/fill/w_520,h_578,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4ccbae_a5fed166eea04130ac5f77b9b10ff9f5~mv2.jpg",
        "https://m.media-amazon.com/images/I/61YVE0H8q0L._UF1000,1000_QL80_.jpg"
      ]
    },
    {
      name: "Perfume Moschino",
      description: " TOY 2 Mujer.",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/moschino-toy-2-perfumes-503.webp?v=1713416484",
        "https://i5.walmartimages.com/asr/d3042d19-1286-427f-a5ca-e8cc9ae4f3a9.d6bb2c417e771ed49ba0b628f1ea7b72.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    
      ]
    },
    {
      name: "Perfume Moschino",
      description: " Toy 2 Bubble Gum Mujer.",
      price: 120.000,
      images: [
        "https://facescr.vtexassets.com/arquivos/ids/202440-800-auto?v=638840382798130000&width=800&height=auto&aspect=true",
        "https://media.falabella.com/falabellaCO/13877483_1/w=1500,h=1500,fit=pad",
    
      ]
    },
    {
      name: "Perfume Arabe LATTAFA",
      description: "BADEE-AL-OUD-BLACK.",
      price: 120.000,
      images: [
        "https://cdn.shopify.com/s/files/1/0656/8348/8983/files/LATTAFA--BADEE-AL-OUD-BLACK-100ML-cosmeticos-en-linea.jpg?v=1722026440 ",
        "https://www.antioquiaventas.com/cdn/shop/files/Perfume-Lattafa-Oud-for-Glory-1.jpg?v=1731593970",
        
      ]
    }, {
      name: "Perfume Arabe LATTAFA",
      description: " Bade'e Al Oud Amethyst Unisex",
      price: 120.000,
      images: [
        "https://agaval.vtexassets.com/arquivos/ids/2578271/image-21fb5fd4adba457bbaf6222f70baf7c0.jpg?v=638811237774530000",
        "https://upperprestige.com/cdn/shop/files/1_48642148-1d40-4e91-ad38-24ae7e58fe32.png?v=1752175416",
    
      ]
    },
    {
      name: "Perfume Arabe LATTAFA",
      description: " Honor & Glory",
      price: 120.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2023/09/perfume18-17.jpg",
        "https://houseofbeauty.com.co/cdn/shop/files/EMPERAMBERMODA100MLSPREDP_1_600x.png?v=1749755976",
        
      ]
    },
    {
      name: "Perfume Arabe LATTAFA",
      description: "BADEE AL OUD SUBLIME UNISEX",
      price: 120.000,
      images: [
        "https://cdnx.jumpseller.com/sairam/image/36974451/thumb/1500/1500?1687978023",
        "https://prebel.vtexassets.com/arquivos/ids/185502-800-auto?v=638567594586000000&width=800&height=auto&aspect=truee",
        
      ]
    },
    {
      name: "Perfume Arabe LATTAFA",
      description: "Yara",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_886656-MCO84039126849_042025-O.webp",
        "https://media.falabella.com/falabellaCO/123834196_01/w=800,h=800,fit=pad",
    
      ]
    },
    {
      name: "Perfume Arabe LATTAFA",
      description: "Yara Candy",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/files/Lattafa-Yara-Candy.jpg?v=1727393152",
        "https://i5.walmartimages.com/asr/cd1cc42d-bb0f-4be3-acb2-adce40dc86f2.d30a07c6339893bd4fde0c3df6e550df.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        
      ]
    },
    {
      name: "Perfume Arabe LATTAFA",
      description: "Yara Tous",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/files/Lattafa-Yara-Tous.png?v=1697036194",
        "https://m.media-amazon.com/images/I/41dETcvyQkL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume Arabe lATTAFA",
      description: "asad.",
      price: 120.000,
      images: [
        "https://cdn.notinoimg.com/detail_main_lq/lattafa/6291108735411_02-o/asad___220927.jpg",
        "https://cdn.awsli.com.br/2667/2667788/produto/289909056/asad-19wfcg824h.jpg",
        
      ]
    },
    {
      name: "Perfume Arabe LATTAFA ",
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
      name: "Perfume VERSACE ",
      description: "EROS ENERGY.",
      price: 120.000,
      images: [
        "https://static.wixstatic.com/media/4ccbae_ec988837a90f4d1099456404ad02dac4~mv2.jpg/v1/fill/w_520,h_582,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4ccbae_ec988837a90f4d1099456404ad02dac4~mv2.jpg",
        "https://www.lijepa.hr/data/cache/thumb_min500_max1000-min500_max1000-12/products/495131/1734010088/versace-eros-energy-parfemska-voda-za-muskarce-50-ml-605580.jpg"
      ]
    },
    {
      name: "Perfume VERSACE",
      description: " Eros Najim",
      price: 120.000,
      images: [
        "https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw5e7b8290/original/90_R740310-R100MLS_RNUL_22_Eros~Najim~Parfum~100~ml-Fragrances~~Body~Care-Versace-online-store_0_0.jpg?sw=850&q=85&strip=true",
        "https://www.perfumesbogota.com.co/cdn/shop/files/perfume-versace-eros-najim-parfum-100ml-hombre-1494336_2048x.png?v=1758668573",
        
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: " Invictus Victory.",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/invictus-victory-extreme-paco-rabanne-100ml-perfumes-712.webp?v=1713419209",
        "https://cdn.notinoimg.com/detail_main_lq/paco-rabanne/3349668614523_01-o/invictus-victory-elixir___250428.jpg",
       
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: " Invictus Victory Elixir.",
      price: 120.000,
      images: [
        "https://f.fcdn.app/imgs/7a4928/electroventas.com.uy/elecuy/ce5b/original/catalogo/VIE65188729_VIE65188729_1/2000-2000/perfume-paco-rabanne-invictus-victory-elixir-edp-50ml-perfume-paco-rabanne-invictus-victory-elixir-edp-50ml.jpg",
        "https://perfumeriasvalencia.com/static/imagenes/productos/shop_2022/phpD5SRXL_659.webp",
        
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: "INVICTUS.",
      price: 120.000,
      images: [
        "https://compras.macedonia.com.py/wp-content/uploads/2023/05/3883737.png",
        "https://cdn5.coppel.com/pr/7160702-2.jpg?iresize=width:400,height:320"
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: "1 Million.",
      price: 120.000,
      images: [
        "https://cdn.valmara.co/51986-large_default/perfume-para-hombre-1-million-parfum-de-paco-rabanne-100-ml.webp",
        "https://essentia.com.do/wp-content/uploads/2024/02/Paco-Rabanne-1-Million.png",
    
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: " Invictus Legend.",
      price: 120.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/invictuslegend100ml.jpg?v=1717780825&width=416",
        "https://perfumes.ec/cdn/shop/files/PacoRabanneInvictusLegend100ml_7b4fd5a4-5b54-4c32-8b8a-65336fa04a3d.png?v=1715727101",
    
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: " Pure Xs.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_Q_NP_877333-MLU72648381204_112023-O.webp ",
        "https://media.falabella.com/falabellaCO/8077184_1/w=1500,h=1500,fit=pad",
        
      ]
    }, {
      name: "Perfume Paco Rabanne",
      description: "Olympéa Legend",
      price: 120.000,
      images: [
        "https://www.abc.cl/dw/image/v2/BCPP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw49175f39/images/large/24920798.jpg?sw=1200&sh=1200&sm=fit",
        "https://i5.walmartimages.com/asr/9df81be2-8980-47a9-9b94-e2a10e169e20.7f52945e149f925bf6f6c2435d9695fb.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: "Hombre Phantom",
      price:120.000,
      images: [
        "https://media.falabella.com/falabellaCO/18352389_2/w=800,h=800,fit=pad",
        "https://media.falabella.com/falabellaCO/18352389_1/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: "Phantom Night",
      price: 120.000,
      images: [
        "https://yauras.cl/cdn/shop/files/CopiadeCopiadeAntonioBanderasMediterraneo_6_dd2ceba0-e217-4adb-92d5-1f8fbeb42f2c_700x700.jpg?v=1740058755",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/p/a/paco_rabanne_phantom_parfum_100ml.jpg",
        
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: "Phantom Intense",
      price: 120.000,
      images: [
        "https://www.tiendasekono.com/media/catalog/product/4/3/4360957.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=1080&width=1080&canvas=1080:1080",
        "https://mundoreloj.com.co/wp-content/uploads/2024/05/Paco-Rabanne-Phantom-Intense-02.jpg",
    
      ]
    },
    {
      name: "Perfume Paco Rabanne",
      description: "Phantom Legion",
      price: 120.000,
      images: [
        "https://cazanovaonline.mx/cdn/shop/products/phantom-legion-paco-rabanne-eau-de-toilette-spray-100ml.jpg?v=1673397641",
        "https://http2.mlstatic.com/D_NQ_NP_875484-MLA51716157649_092022-O.webp",
        
      ]
    },
    {
      name: "Perfume Montale",
      description: "Oud Damascus",
      price: 120.000,
      images: [
        "https://perfumeriacristlaurent.com/wp-content/uploads/2025/09/Perfume-Montale-Oud-Damascus-100ml-Edp-Unisex.webp",
        "https://m.media-amazon.com/images/I/71fJIB2StlL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume Montale",
      description: "Arabians Tonka.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_904499-MCO49040621580_022022-O.webp",
        "https://fraganciascolombia.com/cdn/shop/files/arabians-tonka.jpg?v=1746648497",
        
      ]
    },
    {
      name: "Perfume Montale",
      description: "Dark Purple Ámbar Floral.",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/montale-paris-intense-cafe-100-ml-perfumes-852.webp?v=1713418279",
        "https://ss701.liverpool.com.mx/xl/1148620632.jpg",
        
      ]
    },
    {
      name: "Perfume Montale",
      description: "Oud Tobacco.",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_848966-MLU73881814405_012024-O.webp",
        "https://mainstreetmde.co/cdn/shop/products/OUDTOBACCO.jpg?v=1644166514",
        
      ]
    },
        {
      name: "Perfume Montale",
      description: "Starry Nights.",
      price: 120.000,
      images: [
        "https://mundoreloj.com.co/wp-content/uploads/2024/07/Montale-Starry-Nights-01.jpg.webp",
        "https://www.perfumeriamaiane.com/wp-content/uploads/2017/11/starry-nights-montale-paris.jpg" 
      ]
    },
    {
      name: "Perfume Montale",
      description: "So Iris Intense.",
      price: 120.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/montale-paris-day-dreams-100-ml-perfumes-689.webp?v=1713418161",
        "https://cdn.valmara.co/54075-large_default/perfumes-unisex-so-iris-intense-de-montale-100-ml-edp.webp"
      ]
    },
    {
      name: "Perfume Montale",
      description: "Agua De Perfume Oudrising Vapo",
      price: 120.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/montale-oudrising-eau-de-parfum-unisex___210702.webp?v=1717087694",
        "https://fimgs.net/mdimg/perfume/o.60402.jpg",
        
      ]
    },
    {
      name: "Perfume Ariana Grande",
      description: "Cloud Pink.",
      price: 120.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2025/01/PERFUMES-76.png",
        "https://media.superdrug.com//medias/sys_master/prd-images/h8d/h23/11027028738078/prd-front-834196_600x600/prd-front-834196-600x600.jpg",
       
      ]
    },
    {
      name: "Perfume Ariana Grande ",
      description: "Cloud.",
      price: 120.000,
      images: [
        "https://kakaomarket.cr/wp-content/uploads/2023/08/INN020936-Perfume-Ariana-Grande-Cloud-EDP-100ml-Mujer.jpg",
        "https://media.falabella.com/falabellaCO/73141700_001/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume Ariana Grande",
      description: "Cloud Intense.",
      price: 120.000,
      images: [
        "https://www.perfumisimo.cl/cdn/shop/files/ArianaGrandeCloud2.0Intenseedp100mlMujerf2.png?v=1725972134&width=800",
        "https://m.media-amazon.com/images/I/51jDz4w+j2L._UF1000,1000_QL80_.jpg"
      ]
    },
    {
      name: "Perfume Ariana Grande",
      description: "Thank U Next.",
      price: 120.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-thank-u-next-ariana-g-eau-de-parfum-100ml-mujer-8977261_300x300.jpg?v=1758670033",
        "https://blushbarmx.vtexassets.com/arquivos/ids/182189/Diapositiva1.jpg?v=638866428765530000",
    
      ]
    },
    {
      name: "Perfume Ariana Grande",
      description: "Thank U Next 2.0.",
      price: 120.000,
      images: [
        "https://perfumeriaonlinex.com/wp-content/uploads/2025/08/ChatGPT-Image-29-ago-2025-15_17_00.png",
        "https://http2.mlstatic.com/D_NQ_NP_831319-MLU74956682187_032024-O.webp",
    
      ]
    },
    {
      name: "Perfume Bvlgari",
      description: "Omnia Coral.",
      price: 120.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2023/10/perfume19-10-1.jpg",
        "https://www.druni.es/media/catalog/product/1/4/1446759.jpg",
        
      ]
    }, {
      name: "Perfume Bvlgari",
      description: "Omnia Paraiba",
      price: 120.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_638760-MLA32688319780_102019-O.webp",
        "https://www.mundodosdecants.com.br/wp-content/uploads/2023/03/Bvlgari-Omnia-Paraiba.jpg",
    
      ]
    },
    {
      name: "Perfume Bvlgari ",
      description: "Omnia Crystalline",
      price: 120.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/files/Omnia-Crystalline_100-ml.jpg?v=1716332849",
        "https://emporiodutyfree.com/wp-content/uploads/2015/04/Perfume-Omnia-Crystalline-De-Bvlgari-Para-Mujer-B.jpg",
        
      ]
    },
    {
      name: "Perfume Lacoste ",
      description: "L 12. 12. Rouge",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumeriamonserrat.com.co%2Fproducto%2Fhombre%2Fl12-rouge-100-ml-eau-de-toilette-hombre%2F%3Fsrsltid%3DAfmBOorC0ac4pMD1pgMR5QDFUkpWWaoMesU2DQRh3DcZqAbH9q1OkpLd&psig=AOvVaw1eV_mQ7ERqUdgjeBBqKR-m&ust=1759784834988000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCvsML7jZADFQAAAAAdAAAAABAE",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Femporiodutyfree.com%2Fcategoria%2Fproduct%2Feau-de-lacoste-l-12-12-rouge-edt-100-ml%2F&psig=AOvVaw1eV_mQ7ERqUdgjeBBqKR-m&ust=1759784834988000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCvsML7jZADFQAAAAAdAAAAABAV",
        
      ]
    },
    {
      name: "Perfume lacoste",
      description: "L 12. 12. Noir",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumesmundiales.com%2Fproducto%2Fperfume-eau-de-lacoste-noir-de-100ml-para-caballeros%2F&psig=AOvVaw1eV_mQ7ERqUdgjeBBqKR-m&ust=1759784834988000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCvsML7jZADFQAAAAAdAAAAABAm",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.co.faces.com%2Fperfume-lacoste-hombre-12-12-noir-edt-blac00192%2Fp&psig=AOvVaw1eV_mQ7ERqUdgjeBBqKR-m&ust=1759784834988000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCvsML7jZADFQAAAAAdAAAAABAw",
    
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "Blanc Para Hombre",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Farticulo.mercadolibre.com.ve%2FMLV-541154994-perfume-l1212-blanc-de-lacoste-para-caballero-_JM&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABAd",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcr.faces.com%2Fperfume-lacoste-hombre-12-12-blanc-edt-blac00196%2Fp&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABAT",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Magnetic Para Hombre",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fessenzaperfumes.cr%2Fproducto%2Fl-12-12-azul-magnetic-by-lacoste%2F&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBV",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fessenzaperfumes.cr%2Fproducto%2Fl-12-12-azul-magnetic-by-lacoste%2F&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBC",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12. Vert Hombre.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.perfumesmatis.com.co%2Fperfume-lacoste-l1212-vert-hombre-100ml-11-premium&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBf",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ktm.com.tr%2Fjgefa.aspx%3Fcid%3D82%26res%3Dperfume%2Blacoste%2Bverde%26g%3D11&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBm",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: " L.12.12 Bleu Azu - L.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.co%2Flocion-perfume-lacoste-l1212-bleu-azu-l%2Fp%2FMCO22276458&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBw",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fparfumy.heureka.sk%2Flacoste-eau-de-lacoste-l-12_12-blue-powerful-intense-toaletna-voda-panska-100-ml-tester%2F&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABCLAQ",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Jaune Yellow.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvalmara.co%2Fperfumes-para-hombres-lacoste-l-12-12-amarillo-jaune-100ml.html%3Fsrsltid%3DAfmBOooDXr1j1qz3WHQ_Tp0Vsv1-cldA6RaCfuJ_w_5BcDgpa0aDEoxl&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABCWAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com.mx%2FLacoste-Eau-Toilette-L-12-12-Jaune%2Fdp%2FB00Q8GWAOY&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABC7AQ",
        
      ]
    },
     {
      name: "Perfume Lacoste",
      description: "L.12.12 Elle Sparkling Rose.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmundoaromas.cl%2Fproducts%2Fperfume-lacoste-12-12-elle-sparkling-edt-90ml-mujer&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABDfAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.co.faces.com%2Fperfume-lacoste-mujer-12-12-rose-sparkling-edt-blac00193%2Fp&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABDpAQ" 
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12:12 Rose Eau Fraiche EDT.",
      price: 120.000,
      images: [
        "https://static.wixstatic.com/media/4ccbae_ec988837a90f4d1099456404ad02dac4~mv2.jpg/v1/fill/w_520,h_582,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4ccbae_ec988837a90f4d1099456404ad02dac4~mv2.jpg",
        "https://www.lijepa.hr/data/cache/thumb_min500_max1000-min500_max1000-12/products/495131/1734010088/versace-eros-energy-parfemska-voda-za-muskarce-50-ml-605580.jpg"
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Women para mujer Liverpool",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvalmara.co%2Fmarcas%2Flacoste%3Fsrsltid%3DAfmBOood4Y9kGlYWbOdVFvEMydMYo_WiecYeQzRfL83qIM8i6cdlQ_lT&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABCiAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liverpool.com.mx%2Ftienda%2Fpdp%2FEau-de-toilette-Lacoste-L.12.12-Women-para-mujer%2F1085053163%3Fgfeed%3Dtrue&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABCYAg",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Pour Elle Magnetic.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.ar%2Fperfume-lacoste-l1212-pour-elle-magnetic-80-ml-edp%2Fp%2FMLA28164616&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAL",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fluryx.com.co%2Flacoste-l-12-12-pour-elle-magnetic-para-mujer-eau-de-parfum-80-ml%3Fsrsltid%3DAfmBOorC-q7Wh33vOb2FycO405YO2g3i1BJAeG92tZqEKW0PejPF4aVw&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAE",
       
      ]
    },
    {
      name: "Perfume Lacoste",
      description: " L.12.12 Pour Elle Elegant para mujer.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfume-center-de-mexico.jumpseller.com%2Feau-de-lacoste-l1212-pour-elle-elegant-para-mujer-90-ml-eau-de-toilette-spray&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAV",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fessenzaperfumes.cr%2Fproducto%2Fl-12-12-pour-elle-elegant-by-lacoste-2%2F&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAc",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Rose Intense Edt.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.paris.cl%2Fperfume-lacoste-l1212-rose-intense-edt-100ml-mujer-MKMTTE6GTZ.html&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAm",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumesagustin.cl%2Finicio%2F871-lacoste-l1212-rose-eau-intense-100-ml-edt.html&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAt"
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "PENDIENTE.",
      price: 120.000,
      images: [
        "https://cdn.valmara.co/51986-large_default/perfume-para-hombre-1-million-parfum-de-paco-rabanne-100-ml.webp",
        "https://essentia.com.do/wp-content/uploads/2024/02/Paco-Rabanne-1-Million.png",
    
      ]
    },
    {
      name: "Perfume Lacoste",
      description: " Touch Of Pink.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.falabella.com%2Ffalabella-cl%2Fproduct%2F50387759%2FPerfume-Mujer-Touch-Of-Pink-Edt-90Ml-Edicion-Limitada-Lacoste%2F50387759&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABA_",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liverpool.com.mx%2Ftienda%2Fpdp%2Feau-de-toilette-lacoste-pink-para-mujer%2F38267329&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABBJ",
    
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Boss Bottled edp.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dafiti.com.co%2FPerfume-Boss-Bottled-De-Hugo-Boss-Para-Hombre-100-Ml-1670040.html&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABAz",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.openfarma.com.ar%2Fperfume-importado-hombre-hugo-boss-boss-bottled-edp-100ml%2Fp&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABA5",
        
      ]
    }, {
      name: "Perfume Hugo Boss",
      description: "Bottled Hombre",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftiendamia.com%2Fproducto%3Famz%3DB0B8MF6X5L%26pName%3DHugo-Boss-Bottled-Parfum&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABBX",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fufra.com.mx%2Fhugo-boss-bottled-parfum-100ml-edp.html&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABBg",
    
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Toilette",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.falabella.com.co%2Ffalabella-co%2Fproduct%2F19504432%2FHUGO-Man-Eau-de-Toilette-para-Hombre-125-Ml%2F19504432&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABB9",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.co%2Fhugo-boss-man-hugo-man-tradicional-edt-125ml-para-hombre%2Fp%2FMCO9789912&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCRAQ",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "The Scent",
      price: 120.000,
      images: [
        "https://yauras.cl/cdn/shop/files/CopiadeCopiadeAntonioBanderasMediterraneo_6_dd2ceba0-e217-4adb-92d5-1f8fbeb42f2c_700x700.jpg?v=1740058755",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/p/a/paco_rabanne_phantom_parfum_100ml.jpg",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "INTENSE FOR MEN",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.co.faces.com%2Fperfume-hugo-boss-hombre-intense-for-men-edp-bhug00409%2Fp%3Fsrsltid%3DAfmBOorZoqlGDVHQzGdDiIy1PI320RkVZJYcwvr9ouW7h9sMp0clqaEe&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDBAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.suburbia.com.mx%2Ftienda%2Fpdp%2Feau-de-parfum-hugo-boss-intense-para-hombre%2Fsb5010658685&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDLAQ",
    
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Bottled Night",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvalmara.co%2Fperfume-para-hombre-boss-bottled-night-100ml-eau-de-toilette.html%3Fsrsltid%3DAfmBOop8V-gzpbtJoe0kokwUiEJnzKXhjDlFC_QmyU-sHiHcELTx1w7O&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDWAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumaste.com%2Fproducto%2Fperfume-boss-bottled-night-de-hugo-boss-para-hombre-100-ml%2F%3Fsrsltid%3DAfmBOoql7MOsL4ufL_-_Pv1KG2BFyWYtTYuusI8WBWdIppvWr57x8sL_&psig=AOvVaw1A-8DPuyIxLUThvxEMIe2i&ust=1759790966428000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKCh262SjpADFQAAAAAdAAAAABAE",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Just Different EDT",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.eliteperfumes.cl%2Fproducts%2Fhugo-boss-hugo-men-just-different-edt-40-ml-h&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCEAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fessenzaperfumes.cr%2Fproducto%2Fjust-different-by-hugo-boss%2F&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCOAg",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Bottled Unlimited.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.perfumesbogota.com.co%2Fproducts%2Fhugo-boss-boss-unlimited-200ml%3Fsrsltid%3DAfmBOoowDJghp9lwmDamPu1JetecqkbTEo9Sr0yTBEe0fPhtLQiB1p7t&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCgAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fufra.com.mx%2Fhugo-boss-bottled-unlimited-100ml-edt.html&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCqAg",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: " Iced .",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Flmd.com.co%2Fproducts%2Fperfume-hugo-boss-iced-125ml-eau-de-toilette-hombre%3Fsrsltid%3DAfmBOorhh7tlm1DN0701SWK6wD3gnZblC072GqOItm_XYB8-bU6N6u9t&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABC0Ag",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.belezanaweb.com.br%2Fhugo-iced-hugo-boss-eau-de-toilette-perfume-masculino-75ml%2F&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABC7Ag",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Jeans Eau de Toilette.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffraganceroscolombia.com.co%2Fperfume%2Fperfume-hugo-boss-jeans-eau-de-toilette-125ml-hombre%2F%3Fsrsltid%3DAfmBOoq6YeRd30qPWO7gHwRkE1AE38Y4LT1VgLRNmb45YEexKF_AldXd&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDGAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hugoboss.com%2Fes%2Feau-de-toilette-hugo-jeans-de-125%25C2%25A0ml%2Fhbeu58121548_999.html&psig=AOvVaw3qxitTNK4enmSQBkctTFLd&ust=1759791424046000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJjP9YeUjpADFQAAAAAdAAAAABAE",
        
      ]
      
     },
    {
      name: "Perfume Hugo Boss",
      description: "Bottled Pacific.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fluryx.com.co%2Fperfume-hugo-boss-bottled-pacific-edt-100ml%3Fsrsltid%3DAfmBOorLY8Nm60UM6RqpLs_Zrzp0F8-ukXhRqaaXUoQ7K85fIABDTW1R&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDoAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumeriamonserrat.com.co%2Fproducto%2Fhombre%2Fperfume-hugo-boss-bottled-pacific-100-ml-eau-de-toilette-hombre%2F%3Fsrsltid%3DAfmBOoodKGdE-5HPwNq3cm0_JzdOeUDNMYmVVy5I7xBQicSWrWkMvc1d&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDWAg"
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Bottled Bold Citrus",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumeriamonserrat.com.co%2Fproducto%2Fhombre%2Fperfume-hugo-boss-bottled-bold-citrus-100ml-edp-hombre%2F%3Fsrsltid%3DAfmBOopLHtGLLnhhJQRSWUn08VFXARvWtxIai-HjxhKLq01UlHOtWCXT&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDwAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Feaudebeaux.com%2F2025%2F01%2F28%2Fboss-bottled-bold-citrus-la-sofisticacion-de-la-cidra%2F&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABD3Ag",
        
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "Very Good Girl.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.frutafresca.com.co%2Fperfume-carolina-herrera-4001721902-65165902%2Fp%3Fsrsltid%3DAfmBOorUcd1F7N-E_Mtsau2gZ2MxdcgIzZXV0UW9iZuIP6Zf4ebDQsjn&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC1y6yYjpADFQAAAAAdAAAAABAE",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffelix.com.pa%2Fproducts%2Fcarolina-herrera-very-good-girl-eau-de-parfum&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC1y6yYjpADFQAAAAAdAAAAABAK",
       
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: " Ámbar Floral.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmwhite.com.co%2Fproducts%2Fperfume-carolina-herrera-good-girl%3Fsrsltid%3DAfmBOoqdtfa6Q870Hf2ytuGv9sazc01VyXbFC8VovoXPHeWu3BNMBJj9&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC1y6yYjpADFQAAAAAdAAAAABAU",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.perfumistas.com.ar%2Fproductos%2Fcarolina-herrera-good-girl-legere%2F&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC1y6yYjpADFQAAAAAdAAAAABAy",
        
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "GOOD GIRL BLUSH.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fluryx.com.co%2Fperfume-carolina-herrera-good-girl-blush-edp-80ml-for-women%3Fsrsltid%3DAfmBOooeW4JB_TsCn8pA0Rv55IIvmTcb5Uj2pVdU3MrVi1g2QK3TePTO&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC1y6yYjpADFQAAAAAdAAAAABA8",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sears.com.mx%2Fproducto%2F2418982%2Feau-de-parfum-carolina-herrera-good-girl-blush-50-ml-para-mujer&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC1y6yYjpADFQAAAAAdAAAAABBG"
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "Good Girl Supreme.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ubuy.com.pa%2Fes%2Fproduct%2F9H5GAWIU-carolina-herrera-good-girl-supreme-1-7-eau-de-parfum-spray&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC1y6yYjpADFQAAAAAdAAAAABBY",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.falabella.com%2Ffalabella-cl%2Fproduct%2F14527447%2FPerfume-Mujer-Good-Girl-Supreme-EDP-30-ml-Carolina-Herrera&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC1y6yYjpADFQAAAAAdAAAAABBi",
    
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "CH MUJER.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimple.ripley.com.pe%2Fperfume-carolina-herrera-ch-mujer-edt-50ml-2014269089148p&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC1y6yYjpADFQAAAAAdAAAAABB8",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.falabella.com.co%2Ffalabella-co%2Fproduct%2F69652586%2FPerfume-Mujer-Carolina-Herrera-CH-EDT-100ml-EDT%2F69652586&psig=AOvVaw13dabK-F_LSnmR3HcjVBte&ust=1759792536615000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKC1y6yYjpADFQAAAAAdAAAAABCFAQ",
    
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "Good Girl Sparkling Ice.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumeriamonserrat.com.co%2Fproducto%2Fmujer%2Fperfume-carolina-herrera-good-girl-sparkling-ice-80ml-edp-mujer%2F%3Fsrsltid%3DAfmBOorNOn_rtxGqb-3lXKtzxfi_CiG_EMO978l-jg8gJjVSyYnwlx84&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDt5raajpADFQAAAAAdAAAAABAL",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jaiperfumeria.com%2Fproduct%2Fcarolina-herrera-good-girl-sparkling-ice-eau-de-parfum-80-ml-mujer%2F&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDt5raajpADFQAAAAAdAAAAABAV",
        
      ]
    }, {
      name: "Perfume Carolina Herrera",
      description: "Good Girl Dazzling Garden",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumeriamonserrat.com.co%2Fproducto%2Fmujer%2Fperfume-carolina-herrera-good-girl-dazzling-garden-80-ml-eau-de-parfum-mujer%2F%3Fsrsltid%3DAfmBOoqeWGxX2FSOEDYPgL4lu-CT_s5WEAOIBnbd7Qv9J0yYcPB_gdLo&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDt5raajpADFQAAAAAdAAAAABAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fabscents.com.mx%2Fproducts%2Fgood-girl-dazzling-garden&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDt5raajpADFQAAAAAdAAAAABAn",
    
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "Lunar Lover Limited Edition 2025",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fragrantica.es%2Fnoticia%2FCarolina-Herrera-Lunar-Lover-Limited-Edition-2025-8487.html&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDt5raajpADFQAAAAAdAAAAABAy",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fragrantica.es%2Fperfume%2FCarolina-Herrera%2FLunar-Lover-Limited-Edition-2025-100903.html&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDt5raajpADFQAAAAAdAAAAABA5",
        
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "Bad Boy Dazzling Garden",
      price: 120.000,
      images: [
        "https://mundoreloj.com.co/wp-content/uploads/2024/06/Bad-Boy-Dazzling-Garden-01.jpg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.co.faces.com%2Fperfume-carolina-herrera-bad-boy-coll-hombre-edt-bche01921%2Fp%3Fsrsltid%3DAfmBOorCp3j7eT0j1K01CbYztFEVJ1hG8h6kneMSZqjBrkTeCb8pZCgI&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDt5raajpADFQAAAAAdAAAAABBD",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fleloynparfums.com.br%2Fproducts%2Fcarolina-herrera-bad-boy-dazzling-garden-eau-de-parfum-masculino&psig=AOvVaw00fH1Wqs3bLRRQ1B2DPEfA&ust=1759793511012000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIDe1eubjpADFQAAAAAdAAAAABAL",
        
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "bad boy cobalt elixir",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffraganceroscolombia.com.co%2Fperfume%2Fperfume-carolina-herrera-bad-boy-cobalt-elixir-eau-de-parfum-100ml-hombre%2F%3Fsrsltid%3DAfmBOorNcsDMcTK_T71o-jZ68EPR7Z7APD1TIEjp-SYOWw9PQs2BtR3a&psig=AOvVaw00fH1Wqs3bLRRQ1B2DPEfA&ust=1759793511012000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIDe1eubjpADFQAAAAAdAAAAABAV",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liverpool.com.mx%2Ftienda%2Fpdp%2Feau-de-parfum-carolina-herrera-bad-boy-cobalt-elixir-para-hombre%2F1152344181&psig=AOvVaw37e8FLBwHjN2Usu1uoiSp_&ust=1759793641279000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMCQ_7KcjpADFQAAAAAdAAAAABAf   ",
    
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: " Bad Boy Coll",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.ar%2Fset-perfume-hombre-carolina-herrera-bad-boy-coll-edt-100-ml%2Fup%2FMLAU127337192&psig=AOvVaw00fH1Wqs3bLRRQ1B2DPEfA&ust=1759793511012000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIDe1eubjpADFQAAAAAdAAAAABAf",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cimaco.com.mx%2Fproducto%2Fch-bad-boy-gold-coll-edt-100-ml-ed-limitada%2F1386531%3Fsrsltid%3DAfmBOooYC3sNu8eSYaQMuN5JJPmH2rhu9a1ydE3RhjGRvrVRk6Pr28OG&psig=AOvVaw2hSD1AqwhN_1wMGf8F1ZBa&ust=1759793850760000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiMo42djpADFQAAAAAdAAAAABAE",
        
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: " 212 Sexy",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Femporiodutyfree.com%2Fcategoria%2Fproduct%2F212-sexy-carolina-herrera-edp-100-ml%2F%3Fsrsltid%3DAfmBOopOqYCBxT9vf36XNt6Dgb7c4HMg7ETBMMPb971aSR6HscoGzuKZ&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDt5raajpADFQAAAAAdAAAAABB2",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bodegaaurrera.com.mx%2Fip%2Fperfumes-y-lociones%2Fperfume-carolina-herrera-212-vip-rose-eau-de-parfum-80-ml%2F00016923870306&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABCHAQ",
        
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "La Bomba Mujer.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Flmd.com.co%2Fproducts%2Fperfume-carolina-herrera-la-bomba-mujer-edp-80ml%3Fsrsltid%3DAfmBOoqTsRVFstWhAgiFCx143VLOddNymat7EucwLegq9bbSb3eg-x9f&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABCSAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Flaperfumeriadeleon.com%2Ftienda%2Fla-bomba-carolina-herrera-eau-de-parfum-80-ml%2F&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABCZAQ",
        
      ]
    },
    {
      name: "Perfume Carpolina Herrera",
      description: "212 NYC.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumesymarcas.com%2Fperfume-212-de-carolina-herrera-para-mujer-100-ml%2F%3Fsrsltid%3DAfmBOoo7Lh67cCKGOXZEKnbxPrpaD2VxRR-bIrAjfBpN2s-oiiWNumCW&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABCjAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Farticulo.mercadolibre.com.uy%2FMLU-646609509-perfume-carolina-herrera-212-nyc-femme-edt-100-ml-_JM%3Fhighlight%3Dfalse%26headerTopBrand%3Dfalse&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABCtAQ",
        
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "212 VIP.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcomercialcaracas.com%2Fproductos%2Fperfume-212-vip-carolina-herrera-dama-80ml%2F&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABDTAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liverpool.com.mx%2Ftienda%2Fpdp%2Feau-de-parfum-carolina-herrera-212-vip-para-mujer%2F1109736941&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABDnAQ",
        
      ]
    },
     {
      name: "Perfume Carolina Herrera",
      description: "212 FOR MEN.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumeriasnm.cl%2F212-carolina-herrera-100ml-hombre-edt&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABD6AQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fguateselectos.com%2Fproducts%2Fcarolina-herrera-212-men-edt-100ml-2&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABCDAg" 
      ]
    },
    {
      name: "Perfume Carolina Herrera",
      description: "Amazonian Rose.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kylinmotors.com%2F%3Fk%3D130246124&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABCrAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fragrantica.com%2Fperfume%2FCarolina-Herrera%2FAmazonian-Rose-90036.html&psig=AOvVaw1bvH8GugnhBbtbkqYksnEs&ust=1759793129269000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMDt5raajpADFQAAAAAdAAAAABChAg"
      ]
    },
    {
      name: "Perfume KAROL G",
      description: "Bond 9 Bleecker Street",
      price: 160.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.perfumesmatis.com.co%2Fperfume-karol-g-bond-9-bleecker-street&psig=AOvVaw1PnSSL3_oKiX2JMLJaMpQ-&ust=1759796892643000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCIDk4r-ojpADFQAAAAAdAAAAABAE",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpeopleenespanol.com%2Fkarol-g-secreto-perfume-investigacion-redes-bond-8666527&psig=AOvVaw1PnSSL3_oKiX2JMLJaMpQ-&ust=1759796892643000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIDk4r-ojpADFQAAAAAdAAAAABAL",
        
      ]
    },
    {
      name: "Perfume VALENTINO",
      description: " Uomo Born in Roma.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmwhite.com.co%2Fproducts%2Fvalentino-uomo-born-in-roma-100ml%3Fsrsltid%3DAfmBOopYppIVox39Imtx7uQyrjHVIyhBCLUgp4U5ZKACiGKPsbEiZSN2&psig=AOvVaw2InJLBs4gJrN5ZLmNy0cqU&ust=1759797052490000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNiq34SpjpADFQAAAAAdAAAAABAU",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmoustaphalabban.com%2Fproducts%2Fvalentino-uomo-intense-edp&psig=AOvVaw2InJLBs4gJrN5ZLmNy0cqU&ust=1759797052490000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNiq34SpjpADFQAAAAAdAAAAABAn",
       
      ]
    },
    {
      name: "Perfume VALENTINO",
      description: "Born in Roma Agua.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffraganceroscolombia.com.co%2Fperfume%2Fperfume-valentino-donna-born-in-roma-eau-de-parfum-100ml-mujer%2F%3Fsrsltid%3DAfmBOooGq71W-EYVFgCKpzXH1eb1ggNbdfmUb6AseBd7b4-HoGHudSfz&psig=AOvVaw2InJLBs4gJrN5ZLmNy0cqU&ust=1759797052490000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNiq34SpjpADFQAAAAAdAAAAABAx",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumeriacomas.com%2Fes%2Fvalentino-donna-born-in-roma-extradose-parfum-eau-de-parfum-30-ml&psig=AOvVaw2InJLBs4gJrN5ZLmNy0cqU&ust=1759797052490000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNiq34SpjpADFQAAAAAdAAAAABA7",
        
      ]
    },
    {
      name: "Perfume VALENTINO",
      description: " Uomo Born in Roma Green Stravaganza.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmwhite.com.co%2Fproducts%2Fperfume-valentino-uomo-born-in-roma-green-stravaganza%3Fsrsltid%3DAfmBOorJpbn0v3ILcxyrmsQY75X34GnX5-tMvmsQvCvgEiWeeEnvD9LI&psig=AOvVaw2InJLBs4gJrN5ZLmNy0cqU&ust=1759797052490000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNiq34SpjpADFQAAAAAdAAAAABBE",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdisfragancias.com%2Fproducts%2Fvalentino-uomo-born-in-roma-green-stravaganza&psig=AOvVaw2InJLBs4gJrN5ZLmNy0cqU&ust=1759797052490000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNiq34SpjpADFQAAAAAdAAAAABBO"
      ]
    },
    {
      name: "Perfume ARMANI Giorgio Acqua",
      description: " Di Gio.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fattoperfumes.com.co%2Fproducts%2Facqua-di-gio-giorgio-armani-100ml-edt-hombre%3Fsrsltid%3DAfmBOoo8PhGTtSl2W2cc7Wro2fFSlvsjHWK0thIOiL4FrlW04-YIw49Z&psig=AOvVaw0KyDjVMtsaYpmlvgcUGHXY&ust=1759797503291000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLjfrNyqjpADFQAAAAAdAAAAABAE",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.falabella.com.pe%2Ffalabella-pe%2Fproduct%2F18808310%2FAcqua-Di-Gio-Edt-200-ml-GIORGIO-ARMANI.-Hombre%2F18808310&psig=AOvVaw0KyDjVMtsaYpmlvgcUGHXY&ust=1759797503291000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLjfrNyqjpADFQAAAAAdAAAAABAK",
    
      ]
    },
    {
      name: "Perfume ARMANI Giorgio Acqua",
      description: " Profondo.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.co%2Facqua-di-gio-profondo-parfum-100ml-giorgio-armani-2024-volumen-de-la-unidad-100-ml%2Fp%2FMCO37704978&psig=AOvVaw0KyDjVMtsaYpmlvgcUGHXY&ust=1759797503291000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLjfrNyqjpADFQAAAAAdAAAAABAT",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sabina.com%2Fes%2Fperfumes-hombre%2F22887-acqua-di-gio-profondo-parfum.html&psig=AOvVaw0KyDjVMtsaYpmlvgcUGHXY&ust=1759797503291000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLjfrNyqjpADFQAAAAAdAAAAABAd",
    
      ]
    },
    {
      name: "Perfume Paco Rabanne Pure Xs",
      description: "PENDIENTE.",
      price: 350.000,
      images: [
        "https://http2.mlstatic.com/D_Q_NP_877333-MLU72648381204_112023-O.webp ",
        "https://media.falabella.com/falabellaCO/8077184_1/w=1500,h=1500,fit=pad",
        
      ]
    }, {
      name: "Perfume Paco Rabanne Olympéa Legend",
      description: "PENDIENTE",
      price: 200.000,
      images: [
        "https://www.abc.cl/dw/image/v2/BCPP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw49175f39/images/large/24920798.jpg?sw=1200&sh=1200&sm=fit",
        "https://i5.walmartimages.com/asr/9df81be2-8980-47a9-9b94-e2a10e169e20.7f52945e149f925bf6f6c2435d9695fb.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    
      ]
    },
    {
      name: "Perfume Paco Rabanne Hombre Phantom",
      description: "PENDIENTE",
      price:300.000,
      images: [
        "https://media.falabella.com/falabellaCO/18352389_2/w=800,h=800,fit=pad",
        "https://media.falabella.com/falabellaCO/18352389_1/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume Paco Rabanne Phantom Night",
      description: "PENDIENTE",
      price: 300.000,
      images: [
        "https://yauras.cl/cdn/shop/files/CopiadeCopiadeAntonioBanderasMediterraneo_6_dd2ceba0-e217-4adb-92d5-1f8fbeb42f2c_700x700.jpg?v=1740058755",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/p/a/paco_rabanne_phantom_parfum_100ml.jpg",
        
      ]
    },
    {
      name: "Perfume Paco Rabanne Phantom Intense",
      description: "PENDIENTE",
      price: 200.000,
      images: [
        "https://www.tiendasekono.com/media/catalog/product/4/3/4360957.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=1080&width=1080&canvas=1080:1080",
        "https://mundoreloj.com.co/wp-content/uploads/2024/05/Paco-Rabanne-Phantom-Intense-02.jpg",
    
      ]
    },
    {
      name: "Perfume Paco Rabanne Phantom Legion",
      description: "PENDIENTE",
      price: 200.000,
      images: [
        "https://cazanovaonline.mx/cdn/shop/products/phantom-legion-paco-rabanne-eau-de-toilette-spray-100ml.jpg?v=1673397641",
        "https://http2.mlstatic.com/D_NQ_NP_875484-MLA51716157649_092022-O.webp",
        
      ]
    },
    {
      name: "Perfume Montale Oud Damascus",
      description: "PENDIENTE",
      price: 200.000,
      images: [
        "https://perfumeriacristlaurent.com/wp-content/uploads/2025/09/Perfume-Montale-Oud-Damascus-100ml-Edp-Unisex.webp",
        "https://m.media-amazon.com/images/I/71fJIB2StlL._UF1000,1000_QL80_.jpg",
        
      ]
    },
    {
      name: "Perfume Montale Arabians Tonka",
      description: "PENDIENTE.",
      price: 200.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_904499-MCO49040621580_022022-O.webp",
        "https://fraganciascolombia.com/cdn/shop/files/arabians-tonka.jpg?v=1746648497",
        
      ]
    },
    {
      name: "Perfume Montale Dark Purple Ámbar Floral",
      description: "PENDIENTE.",
      price: 200.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/montale-paris-intense-cafe-100-ml-perfumes-852.webp?v=1713418279",
        "https://ss701.liverpool.com.mx/xl/1148620632.jpg",
        
      ]
    },
    {
      name: "Perfume Montale Oud Tobacco",
      description: "PENDIENTE.",
      price: 300.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_848966-MLU73881814405_012024-O.webp",
        "https://mainstreetmde.co/cdn/shop/products/OUDTOBACCO.jpg?v=1644166514",
        
      ]
    },
        {
      name: "Perfume Montale Starry Nights",
      description: "PEND.",
      price: 200.000,
      images: [
        "https://mundoreloj.com.co/wp-content/uploads/2024/07/Montale-Starry-Nights-01.jpg.webp",
        "https://www.perfumeriamaiane.com/wp-content/uploads/2017/11/starry-nights-montale-paris.jpg" 
      ]
    },
    {
      name: "Perfume Montale So Iris Intense",
      description: "PEND.",
      price: 200.000,
      images: [
        "https://mwhite.com.co/cdn/shop/files/montale-paris-day-dreams-100-ml-perfumes-689.webp?v=1713418161",
        "https://cdn.valmara.co/54075-large_default/perfumes-unisex-so-iris-intense-de-montale-100-ml-edp.webp"
      ]
    },
    {
      name: "Perfume Montale Agua De Perfume Oudrising Vapo",
      description: "PENDIENTE",
      price: 200.000,
      images: [
        "https://lmd.com.co/cdn/shop/files/montale-oudrising-eau-de-parfum-unisex___210702.webp?v=1717087694",
        "https://fimgs.net/mdimg/perfume/o.60402.jpg",
        
      ]
    },
    {
      name: "Perfume Ariana Grande Cloud Pink",
      description: "PENDIENTE.",
      price: 200.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2025/01/PERFUMES-76.png",
        "https://media.superdrug.com//medias/sys_master/prd-images/h8d/h23/11027028738078/prd-front-834196_600x600/prd-front-834196-600x600.jpg",
       
      ]
    },
    {
      name: "Perfume de Mujer Ariana Grande Cloud",
      description: "PENDIENTE.",
      price: 200.000,
      images: [
        "https://kakaomarket.cr/wp-content/uploads/2023/08/INN020936-Perfume-Ariana-Grande-Cloud-EDP-100ml-Mujer.jpg",
        "https://media.falabella.com/falabellaCO/73141700_001/w=1500,h=1500,fit=pad",
        
      ]
    },
    {
      name: "Perfume De Mujer Ariana Grande Cloud Intense",
      description: "PENDIENTE.",
      price: 200.000,
      images: [
        "https://www.perfumisimo.cl/cdn/shop/files/ArianaGrandeCloud2.0Intenseedp100mlMujerf2.png?v=1725972134&width=800",
        "https://m.media-amazon.com/images/I/51jDz4w+j2L._UF1000,1000_QL80_.jpg"
      ]
    },
    {
      name: "Perfume Thank U Next Ariana Grande",
      description: "PENDIENTE.",
      price: 200.000,
      images: [
        "https://www.perfumesbogota.com.co/cdn/shop/products/perfume-thank-u-next-ariana-g-eau-de-parfum-100ml-mujer-8977261_300x300.jpg?v=1758670033",
        "https://blushbarmx.vtexassets.com/arquivos/ids/182189/Diapositiva1.jpg?v=638866428765530000",
    
      ]
    },
    {
      name: "Perfume Ariana Grande Thank U Next 2.0",
      description: "PENDIENTE.",
      price: 200.000,
      images: [
        "https://perfumeriaonlinex.com/wp-content/uploads/2025/08/ChatGPT-Image-29-ago-2025-15_17_00.png",
        "https://http2.mlstatic.com/D_NQ_NP_831319-MLU74956682187_032024-O.webp",
    
      ]
    },
    {
      name: "Perfume Bvlgari Omnia Coral",
      description: "PENDIENTE.",
      price: 200.000,
      images: [
        "https://perfumeriamonserrat.com.co/wp-content/uploads/2023/10/perfume19-10-1.jpg",
        "https://www.druni.es/media/catalog/product/1/4/1446759.jpg",
        
      ]
    }, {
      name: "Perfume Bvlgari Omnia Paraiba",
      description: "PENDIENTE",
      price: 200.000,
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_638760-MLA32688319780_102019-O.webp",
        "https://www.mundodosdecants.com.br/wp-content/uploads/2023/03/Bvlgari-Omnia-Paraiba.jpg",
    
      ]
    },
    {
      name: "Perfume Bvlgari ",
      description: "Omnia Crystalline",
      price: 200.000,
      images: [
        "https://attoperfumes.com.co/cdn/shop/files/Omnia-Crystalline_100-ml.jpg?v=1716332849",
        "https://emporiodutyfree.com/wp-content/uploads/2015/04/Perfume-Omnia-Crystalline-De-Bvlgari-Para-Mujer-B.jpg",
        
      ]
    },
    {
      name: "Perfume Lacoste ",
      description: "L12 Rouge",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumeriamonserrat.com.co%2Fproducto%2Fhombre%2Fl12-rouge-100-ml-eau-de-toilette-hombre%2F%3Fsrsltid%3DAfmBOorC0ac4pMD1pgMR5QDFUkpWWaoMesU2DQRh3DcZqAbH9q1OkpLd&psig=AOvVaw1eV_mQ7ERqUdgjeBBqKR-m&ust=1759784834988000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCvsML7jZADFQAAAAAdAAAAABAE",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Femporiodutyfree.com%2Fcategoria%2Fproduct%2Feau-de-lacoste-l-12-12-rouge-edt-100-ml%2F&psig=AOvVaw1eV_mQ7ERqUdgjeBBqKR-m&ust=1759784834988000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCvsML7jZADFQAAAAAdAAAAABAV",
        
      ]
    },
    {
      name: "Perfume lacoste",
      description: "L 12. 12. Noir",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumesmundiales.com%2Fproducto%2Fperfume-eau-de-lacoste-noir-de-100ml-para-caballeros%2F&psig=AOvVaw1eV_mQ7ERqUdgjeBBqKR-m&ust=1759784834988000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCvsML7jZADFQAAAAAdAAAAABAm",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.co.faces.com%2Fperfume-lacoste-hombre-12-12-noir-edt-blac00192%2Fp&psig=AOvVaw1eV_mQ7ERqUdgjeBBqKR-m&ust=1759784834988000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCvsML7jZADFQAAAAAdAAAAABAw",
    
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "Blanc Para Hombre",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Farticulo.mercadolibre.com.ve%2FMLV-541154994-perfume-l1212-blanc-de-lacoste-para-caballero-_JM&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABAd",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcr.faces.com%2Fperfume-lacoste-hombre-12-12-blanc-edt-blac00196%2Fp&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABAT",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Magnetic Para Hombre",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fessenzaperfumes.cr%2Fproducto%2Fl-12-12-azul-magnetic-by-lacoste%2F&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBV",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fessenzaperfumes.cr%2Fproducto%2Fl-12-12-azul-magnetic-by-lacoste%2F&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBC",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12. Vert Hombre.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.perfumesmatis.com.co%2Fperfume-lacoste-l1212-vert-hombre-100ml-11-premium&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBf",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ktm.com.tr%2Fjgefa.aspx%3Fcid%3D82%26res%3Dperfume%2Blacoste%2Bverde%26g%3D11&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBm",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: " L.12.12 Bleu Azu - L.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.co%2Flocion-perfume-lacoste-l1212-bleu-azu-l%2Fp%2FMCO22276458&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiex9z-jZADFQAAAAAdAAAAABBw",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fparfumy.heureka.sk%2Flacoste-eau-de-lacoste-l-12_12-blue-powerful-intense-toaletna-voda-panska-100-ml-tester%2F&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABCLAQ",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Jaune Yellow.",
      price: 120.000,
      images: [
        "https://cdn.valmara.co/34960-large_default/perfumes-para-hombres-lacoste-l-12-12-amarillo-jaune-100ml.webp",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvalmara.co%2Fperfumes-para-hombres-lacoste-l-12-12-amarillo-jaune-100ml.html%3Fsrsltid%3DAfmBOooDXr1j1qz3WHQ_Tp0Vsv1-cldA6RaCfuJ_w_5BcDgpa0aDEoxl&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABCWAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com.mx%2FLacoste-Eau-Toilette-L-12-12-Jaune%2Fdp%2FB00Q8GWAOY&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABC7AQ",
        
      ]
    },
     {
      name: "Perfume Lacoste",
      description: "12:12 Elle Sparkling Rose.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmundoaromas.cl%2Fproducts%2Fperfume-lacoste-12-12-elle-sparkling-edt-90ml-mujer&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABDfAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.co.faces.com%2Fperfume-lacoste-mujer-12-12-rose-sparkling-edt-blac00193%2Fp&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABDpAQ" 
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12:12 Rose Eau Fraiche EDT.",
      price: 120.000,
      images: [
        "https://static.wixstatic.com/media/4ccbae_ec988837a90f4d1099456404ad02dac4~mv2.jpg/v1/fill/w_520,h_582,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4ccbae_ec988837a90f4d1099456404ad02dac4~mv2.jpg",
        "https://www.lijepa.hr/data/cache/thumb_min500_max1000-min500_max1000-12/products/495131/1734010088/versace-eros-energy-parfemska-voda-za-muskarce-50-ml-605580.jpg"
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Women para mujer Liverpool",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvalmara.co%2Fmarcas%2Flacoste%3Fsrsltid%3DAfmBOood4Y9kGlYWbOdVFvEMydMYo_WiecYeQzRfL83qIM8i6cdlQ_lT&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABCiAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liverpool.com.mx%2Ftienda%2Fpdp%2FEau-de-toilette-Lacoste-L.12.12-Women-para-mujer%2F1085053163%3Fgfeed%3Dtrue&psig=AOvVaw24ZUyzbF0l37AXafV1T1R4&ust=1759785691195000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCMiex9z-jZADFQAAAAAdAAAAABCYAg",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Pour Elle Magnetic.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.ar%2Fperfume-lacoste-l1212-pour-elle-magnetic-80-ml-edp%2Fp%2FMLA28164616&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAL",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fluryx.com.co%2Flacoste-l-12-12-pour-elle-magnetic-para-mujer-eau-de-parfum-80-ml%3Fsrsltid%3DAfmBOorC-q7Wh33vOb2FycO405YO2g3i1BJAeG92tZqEKW0PejPF4aVw&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAE",
       
      ]
    },
    {
      name: "Perfume Lacoste",
      description: " L.12.12 Pour Elle Elegant para mujer.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfume-center-de-mexico.jumpseller.com%2Feau-de-lacoste-l1212-pour-elle-elegant-para-mujer-90-ml-eau-de-toilette-spray&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAV",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fessenzaperfumes.cr%2Fproducto%2Fl-12-12-pour-elle-elegant-by-lacoste-2%2F&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAc",
        
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "L.12.12 Rose Intense Edt.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.paris.cl%2Fperfume-lacoste-l1212-rose-intense-edt-100ml-mujer-MKMTTE6GTZ.html&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAm",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumesagustin.cl%2Finicio%2F871-lacoste-l1212-rose-eau-intense-100-ml-edt.html&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABAt"
      ]
    },
    {
      name: "Perfume Lacoste",
      description: "PENDIENTE.",
      price: 300.000,
      images: [
        "https://cdn.valmara.co/51986-large_default/perfume-para-hombre-1-million-parfum-de-paco-rabanne-100-ml.webp",
        "https://essentia.com.do/wp-content/uploads/2024/02/Paco-Rabanne-1-Million.png",
    
      ]
    },
    {
      name: "Perfume Lacoste",
      description: " Touch Of Pink.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.falabella.com%2Ffalabella-cl%2Fproduct%2F50387759%2FPerfume-Mujer-Touch-Of-Pink-Edt-90Ml-Edicion-Limitada-Lacoste%2F50387759&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABA_",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liverpool.com.mx%2Ftienda%2Fpdp%2Feau-de-toilette-lacoste-pink-para-mujer%2F38267329&psig=AOvVaw2Y2j5SlvtXVx6yVF-4-uWX&ust=1759786977763000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiamcGDjpADFQAAAAAdAAAAABBJ",
    
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Boss Bottled edp.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dafiti.com.co%2FPerfume-Boss-Bottled-De-Hugo-Boss-Para-Hombre-100-Ml-1670040.html&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABAz",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.openfarma.com.ar%2Fperfume-importado-hombre-hugo-boss-boss-bottled-edp-100ml%2Fp&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABA5",
        
      ]
    }, {
      name: "Perfume Hugo Boss",
      description: "Bottled Hombre",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftiendamia.com%2Fproducto%3Famz%3DB0B8MF6X5L%26pName%3DHugo-Boss-Bottled-Parfum&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABBX",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fufra.com.mx%2Fhugo-boss-bottled-parfum-100ml-edp.html&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABBg",
    
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Toilette",
      price:120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.falabella.com.co%2Ffalabella-co%2Fproduct%2F19504432%2FHUGO-Man-Eau-de-Toilette-para-Hombre-125-Ml%2F19504432&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDBz4yGjpADFQAAAAAdAAAAABB9",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.co%2Fhugo-boss-man-hugo-man-tradicional-edt-125ml-para-hombre%2Fp%2FMCO9789912&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCRAQ",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "The Scent",
      price: 120.000,
      images: [
        "https://yauras.cl/cdn/shop/files/CopiadeCopiadeAntonioBanderasMediterraneo_6_dd2ceba0-e217-4adb-92d5-1f8fbeb42f2c_700x700.jpg?v=1740058755",
        "https://luryx.com.co/pub/media/catalog/product/cache/17a2882685dcb778cb02abe71b33b15c/p/a/paco_rabanne_phantom_parfum_100ml.jpg",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "INTENSE FOR MEN",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.co.faces.com%2Fperfume-hugo-boss-hombre-intense-for-men-edp-bhug00409%2Fp%3Fsrsltid%3DAfmBOorZoqlGDVHQzGdDiIy1PI320RkVZJYcwvr9ouW7h9sMp0clqaEe&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDBAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.suburbia.com.mx%2Ftienda%2Fpdp%2Feau-de-parfum-hugo-boss-intense-para-hombre%2Fsb5010658685&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDLAQ",
    
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Bottled Night",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvalmara.co%2Fperfume-para-hombre-boss-bottled-night-100ml-eau-de-toilette.html%3Fsrsltid%3DAfmBOop8V-gzpbtJoe0kokwUiEJnzKXhjDlFC_QmyU-sHiHcELTx1w7O&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDWAQ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fperfumaste.com%2Fproducto%2Fperfume-boss-bottled-night-de-hugo-boss-para-hombre-100-ml%2F%3Fsrsltid%3DAfmBOoql7MOsL4ufL_-_Pv1KG2BFyWYtTYuusI8WBWdIppvWr57x8sL_&psig=AOvVaw1A-8DPuyIxLUThvxEMIe2i&ust=1759790966428000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKCh262SjpADFQAAAAAdAAAAABAE",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Just Different EDT",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.eliteperfumes.cl%2Fproducts%2Fhugo-boss-hugo-men-just-different-edt-40-ml-h&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCEAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fessenzaperfumes.cr%2Fproducto%2Fjust-different-by-hugo-boss%2F&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCOAg",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Bottled Unlimited.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.perfumesbogota.com.co%2Fproducts%2Fhugo-boss-boss-unlimited-200ml%3Fsrsltid%3DAfmBOoowDJghp9lwmDamPu1JetecqkbTEo9Sr0yTBEe0fPhtLQiB1p7t&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCgAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fufra.com.mx%2Fhugo-boss-bottled-unlimited-100ml-edt.html&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABCqAg",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: " Iced .",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Flmd.com.co%2Fproducts%2Fperfume-hugo-boss-iced-125ml-eau-de-toilette-hombre%3Fsrsltid%3DAfmBOorhh7tlm1DN0701SWK6wD3gnZblC072GqOItm_XYB8-bU6N6u9t&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABC0Ag",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.belezanaweb.com.br%2Fhugo-iced-hugo-boss-eau-de-toilette-perfume-masculino-75ml%2F&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABC7Ag",
        
      ]
    },
    {
      name: "Perfume Hugo Boss",
      description: "Jeans Eau de Toilette.",
      price: 120.000,
      images: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffraganceroscolombia.com.co%2Fperfume%2Fperfume-hugo-boss-jeans-eau-de-toilette-125ml-hombre%2F%3Fsrsltid%3DAfmBOoq6YeRd30qPWO7gHwRkE1AE38Y4LT1VgLRNmb45YEexKF_AldXd&psig=AOvVaw35z1wCk724BzyfoxD-TJrz&ust=1759787612339000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCKDBz4yGjpADFQAAAAAdAAAAABDGAg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hugoboss.com%2Fes%2Feau-de-toilette-hugo-jeans-de-125%25C2%25A0ml%2Fhbeu58121548_999.html&psig=AOvVaw3qxitTNK4enmSQBkctTFLd&ust=1759791424046000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJjP9YeUjpADFQAAAAAdAAAAABAE",
        
      ]
      },
    {
      name: "Perfume",
      description: " nombre.",
      price: 120.000,
      images: [
        "xx",
        "xx",
        
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
