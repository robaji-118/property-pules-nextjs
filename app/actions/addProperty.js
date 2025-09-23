'use server'

async function addProperty(formData) {
    // Ekstrak semua data form
    const propertyData = {
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
        },
        beds: parseInt(formData.get('beds')),
        baths: parseInt(formData.get('baths')),
        square_feet: parseInt(formData.get('square_feet')),
        amenities: formData.getAll('amenities'), // Method yang benar
        rates: {
            weekly: formData.get('rates.weekly') ? parseFloat(formData.get('rates.weekly')) : null,
            monthly: formData.get('rates.monthly') ? parseFloat(formData.get('rates.monthly')) : null,
            nightly: formData.get('rates.nightly') ? parseFloat(formData.get('rates.nightly')) : null,
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
        images: formData.getAll('images'),
    }

    console.log('Data Property:', propertyData);
    
    // Di sini biasanya Anda akan menyimpan ke database
    // Untuk saat ini, hanya menampilkan data di console
    
    // Return success atau redirect
    // redirect('/properties') // uncomment jika ingin redirect setelah submit
}

export default addProperty;