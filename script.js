const translations = {
    en: {
        title: "🚀 Smart Reporting",
        police: "Police",
        roads: "Roads & Drainage",
        electricity: "Electricity",
        water: "Water Supply",
        btn: "File Complaint"
    },
    hi: {
        title: "🚀 स्मार्ट रिपोर्टिंग",
        police: "पुलिस",
        roads: "सड़क और ड्रेनेज",
        electricity: "बिजली",
        water: "पानी की आपूर्ति",
        btn: "शिकायत दर्ज करें"
    },
    te: {
        title: "🚀 స్మార్ట్ రిపోర్టింగ్",
        police: "పోలీస్",
        roads: "రోడ్లు & డ్రైనేజ్",
        electricity: "విద్యుత్",
        water: "నీటి సరఫరా",
        btn: "ఫిర్యాదు నమోదు చేయండి"
    }
};

const select = document.getElementById("languageSelect");

select.addEventListener("change", function(){
    const lang = this.value;
    const t = translations[lang];

    document.getElementById("title").innerText = t.title;
    document.getElementById("police").innerText = t.police;
    document.getElementById("roads").innerText = t.roads;
    document.getElementById("electricity").innerText = t.electricity;
    document.getElementById("water").innerText = t.water;

    document.querySelectorAll(".btn").forEach(btn => {
        btn.innerText = t.btn;
    });
});