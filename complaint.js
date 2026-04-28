// 🌐 Language Data
const translations = {
    en: {
        title: "📝 File Complaint",
        name: "Your Name",
        age: "Age",
        profession: "Profession",
        location: "Location",
        address: "Address",
        description: "Describe your complaint...",
        upload: "Upload Proof (Min 2 Photos)",
        submit: "Submit Complaint",
        success: "Complaint Saved Successfully! ✅",
        error: "Server Error ❌"
    },
    hi: {
        title: "📝 शिकायत दर्ज करें",
        name: "आपका नाम",
        age: "उम्र",
        profession: "पेशा",
        location: "स्थान",
        address: "पता",
        description: "अपनी शिकायत लिखें...",
        upload: "प्रमाण अपलोड करें (कम से कम 2 फोटो)",
        submit: "शिकायत जमा करें",
        success: "शिकायत सफलतापूर्वक दर्ज की गई! ✅",
        error: "सर्वर त्रुटि ❌"
    },
    te: {
        title: "📝 ఫిర్యాదు నమోదు చేయండి",
        name: "మీ పేరు",
        age: "వయస్సు",
        profession: "వృత్తి",
        location: "స్థానం",
        address: "చిరునామా",
        description: "మీ ఫిర్యాదును వివరంగా వ్రాయండి...",
        upload: "సాక్ష్యాలు అప్‌లోడ్ చేయండి (కనీసం 2 ఫోటోలు)",
        submit: "ఫిర్యాదు సమర్పించండి",
        success: "ఫిర్యాదు విజయవంతంగా సేవ్ చేయబడింది! ✅",
        error: "సర్వర్ లోపం ❌"
    }
};

// 🎯 Apply Language
function applyLanguage(lang) {
    const t = translations[lang];
    document.getElementById("title").innerText = t.title;
    document.getElementById("name").placeholder = t.name;
    document.getElementById("age").placeholder = t.age;
    document.getElementById("profession").placeholder = t.profession;
    document.getElementById("location").placeholder = t.location;
    document.getElementById("address").placeholder = t.address;
    document.getElementById("description").placeholder = t.description;
    document.getElementById("uploadLabel").innerText = t.upload;
    document.getElementById("submitBtn").innerText = t.submit;
    localStorage.setItem("lang", lang);
}

// 🚀 Page Setup on Load
window.onload = function() {
    let category = localStorage.getItem("category") || "general";
    let title = document.getElementById("categoryTitle");
    let extra = document.getElementById("extraField");

    const categoryData = {
        police: { text: "👮 Police Complaint", placeholder: "Incident Type (Theft, Fight...)" },
        electricity: { text: "⚡ Electricity Complaint", placeholder: "Meter Number" },
        roads: { text: "🛣 Roads Complaint", placeholder: "Road Name / Area" },
        water: { text: "💧 Water Complaint", placeholder: "Water Issue Type" },
        education: { text: "🎓 Education Complaint", placeholder: "School / College Name" }
    };

    if (categoryData[category]) {
        title.innerText = categoryData[category].text;
        extra.innerHTML = `<input type="text" id="dynamicExtra" placeholder="${categoryData[category].placeholder}" required>`;
    }

    let lang = localStorage.getItem("lang") || "en";
    document.getElementById("languageSelect").value = lang;
    applyLanguage(lang);
};

// 🔁 Language Change Event
document.getElementById("languageSelect").addEventListener("change", function() {
    applyLanguage(this.value);
});

// 📤 Submit Function (The Connection Part)
async function submitForm() {
    // Prevent default form reload
    event.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const lang = localStorage.getItem("lang") || "en";
    
    submitBtn.disabled = true;
    submitBtn.innerText = "...";

    // 1. Collect Data using FormData (Required for Multer)
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("age", document.getElementById("age").value);
    formData.append("profession", document.getElementById("profession").value);
    formData.append("location", document.getElementById("location").value);
    formData.append("address", document.getElementById("address").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("category", localStorage.getItem("category") || "general");

    // Capture the dynamic extra field value if it exists
    const extraField = document.getElementById("dynamicExtra");
    if (extraField) {
        formData.append("extraDetails", extraField.value);
    }

    // 2. Handle File (The key "photo" must match your backend)
    const photoInput = document.getElementById("photos");
    if (photoInput.files.length > 0) {
        formData.append("photo", photoInput.files[0]); 
    }

    try {
        // 3. API Call
        const response = await fetch("http://localhost:5000/submit", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            alert(translations[lang].success);
            window.location.reload(); 
        } else {
            alert(translations[lang].error);
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Server not connected! Check your Node.js terminal.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = translations[lang].submit;
    }

    return false;
}