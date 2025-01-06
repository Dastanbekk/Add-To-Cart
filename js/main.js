import { useFetch } from "./utils/index.js";
const cards = document.querySelector(".cards")

const request = useFetch();
request({ url: "products"}).then((data) => getData(data))


function getData(data){
    data.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card")
        card.innerHTML = `
            <div>
                <img src="${product.img}" alt="">
            </div>
    
            <div class="info px-[20px]">
                <h3>
                    ${product.title}
                </h3>
        
                <p>
                    <i class='bx bxs-star' style='color:#ffff00'  ></i>
                    ${product.rate}
                </p>
        
                <p>${product.priceMonth} so'm/oyiga</p>
        
                <div class="flex items-center justify-between">
                    <h3 class='font-bold text-[20px]'>${product.price}</h3>
                    <i class='bx bx-shopping-bag cursor-pointer text-3xl add-to-cart' data-id="${product.id}"></i>
                </div>
            </div>
        
        `
        cards.append(card)
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

function addToCart(e) {
    const productId = e.target.getAttribute("data-id");
    // API ma'lumotlari orasidan mos mahsulotni topish
    request({ url: "products" }).then((data) => {
        const product = data.find(item => item.id == productId);

        // Mahsulot allaqachon savatda bormi tekshirish
        const isExist = cart.find(item => item.id == product.id);

        if (isExist) {
            alert("Bu mahsulot allaqachon savatda mavjud!");
        } else {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Mahsulot savatga qo'shildi!");
        }
    });
}


const cartItemsContainer = document.querySelector('.cart-items');

const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Savat bo'sh!</p>";
} else {
    cart.forEach(product => {
        const item = document.createElement("div");
        item.classList.add('card')
        item.innerHTML = `
        <div>
            <img src="${product.img}" alt="">
        </div>

        <div class="info px-[20px]">
            <h3>
                ${product.title}
            </h3>
    
            <p>
                <i class='bx bxs-star' style='color:#ffff00'  ></i>
                ${product.rate}
            </p>
    
            <p>${product.priceMonth} so'm/oyiga</p>
    
            <div class="flex items-center justify-between">
                <h3 class='font-bold text-[20px]'>${product.price}</h3>
                <i class='bx bx-shopping-bag cursor-pointer text-3xl add-to-cart' data-id="${product.id}"></i>
            </div>
        </div>
        `;
        cartItemsContainer.append(item);
    });
}