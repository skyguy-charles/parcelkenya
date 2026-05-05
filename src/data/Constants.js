export const COUNTIES = [
  "Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Thika","Nyeri","Meru",
  "Garissa","Kitale","Malindi","Lamu","Machakos","Kakamega","Kericho",
  "Embu","Isiolo","Marsabit","Wajir","Mandera","Siaya","Homa Bay","Migori",
  "Kisii","Nyamira","Bomet","Narok","Kajiado","Makueni","Kitui",
  "Tharaka-Nithi","Kirinyaga","Muranga","Kiambu","Nyandarua",
  "Laikipia","Samburu","Baringo","West Pokot","Trans Nzoia",
  "Uasin Gishu","Nandi","Elgeyo-Marakwet","Bungoma","Busia","Vihiga","Turkana"
];

export const SAMPLE_ORDERS = [
  { id:"SPK-001234", from:"Nairobi", to:"Mombasa", date:"28 Apr 2025", status:"delivered", weight:"2.3 kg", price:"KSh 850" },
  { id:"SPK-001190", from:"Kisumu", to:"Nakuru", date:"25 Apr 2025", status:"transit", weight:"0.8 kg", price:"KSh 420" },
  { id:"SPK-001143", from:"Nairobi", to:"Garissa", date:"20 Apr 2025", status:"delivered", weight:"5.1 kg", price:"KSh 1,200" },
  { id:"SPK-001099", from:"Eldoret", to:"Nairobi", date:"15 Apr 2025", status:"delivered", weight:"1.2 kg", price:"KSh 650" },
  { id:"SPK-001060", from:"Nairobi", to:"Wajir", date:"10 Apr 2025", status:"pending", weight:"3.0 kg", price:"KSh 1,800" },
];

export const ZONES = [
  { region:"Nairobi Metro", counties:["Nairobi","Kiambu","Machakos","Kajiado"], icon:"🏙️", speed:"Same day" },
  { region:"Coast Region", counties:["Mombasa","Kilifi","Kwale","Taita-Taveta","Lamu","Tana River"], icon:"🌊", speed:"1–2 days" },
  { region:"Rift Valley", counties:["Nakuru","Kericho","Baringo","Laikipia","Narok","Bomet"], icon:"🦁", speed:"1–2 days" },
  { region:"Western Kenya", counties:["Kakamega","Bungoma","Busia","Vihiga"], icon:"🌿", speed:"2 days" },
  { region:"Nyanza", counties:["Kisumu","Siaya","Homa Bay","Migori","Kisii","Nyamira"], icon:"🐟", speed:"2 days" },
  { region:"Eastern", counties:["Meru","Embu","Kitui","Makueni","Tharaka-Nithi"], icon:"☕", speed:"2–3 days" },
  { region:"Central", counties:["Muranga","Kirinyaga","Nyandarua","Nyeri"], icon:"🍵", speed:"1–2 days" },
  { region:"North Eastern", counties:["Garissa","Wajir","Mandera","Marsabit","Isiolo","Samburu","Turkana"], icon:"🐪", speed:"3–5 days" },
];

export const BRANCHES = [
  { city:"Nairobi — HQ", addr:"Tom Mboya Street, CBD", hours:"Mon–Sat  7am–7pm", icon:"🏢" },
  { city:"Mombasa", addr:"Moi Avenue, Mombasa Island", hours:"Mon–Sat  8am–6pm", icon:"🌊" },
  { city:"Kisumu", addr:"Oginga Odinga Street", hours:"Mon–Sat  8am–6pm", icon:"🐟" },
  { city:"Nakuru", addr:"Kenyatta Avenue, Nakuru Town", hours:"Mon–Sat  8am–5pm", icon:"🦩" },
  { city:"Eldoret", addr:"Uganda Road, Eldoret", hours:"Mon–Sat  8am–5pm", icon:"🌾" },
  { city:"Garissa", addr:"Main Street, Garissa Town", hours:"Mon–Fri  8am–4pm", icon:"🌵" },
];

export const INITIAL_FORM_STATE = {
  senderName:"", senderPhone:"", senderEmail:"", senderCounty:"Nairobi", senderAddress:"",
  recipientName:"", recipientPhone:"", recipientCounty:"", recipientAddress:"",
  weight:"", parcelType:"standard", description:"",
  speed:"standard", date:"", timeSlot:"", insurance:false,
  payment:"mpesa", mpesaPhone:""
};