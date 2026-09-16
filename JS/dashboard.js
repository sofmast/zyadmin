"use strict";

/* =========================================================
   BARCODE STUDIO PRO
   APPLICATION CONTROLLER
========================================================= */

const sidebar = document.querySelector(".sidebar");
const menuBtn = document.getElementById("menuBtn");
const menuItems = document.querySelectorAll(".menu li");
const resetKey =document.getElementById('resetKey');

const workspace =
    document.getElementById("workspace");


/* =========================================================
   STORAGE
========================================================= */

const PRODUCT_STORAGE_KEY =
    "barcode_studio_products";


let products = [];

/* =========================================================
   DEFAULT PRODUCTS
   BARCODE STUDIO PRO
========================================================= */

const DEFAULT_PRODUCTS = [

    {
        id: "ZY-1001",
        name: "Zyaco Rice 5kg Bulk pack",
        sku: "Zyaco Rice 5kg",
        barcode: 6500361003336,
        category: "grains",
        price: 185.00,
        stock: 20,
        lowStock: 5,
        status: "active",
        createdAt: "2026-09-16T00:00:00.000Z",
        updatedAt: "2026-09-16T00:00:00.000Z"
    },

    {
        id: "ZY-1002",
        name: "Zyaco Rice 2.5Kg (Family pack)",
        sku: "ZY-RIC-1000",
        barcode: 6500361002735,
        category: "grains",
        price: 95.00,
        stock: 20,
        lowStock: 10,
        status: "active",
        createdAt: "2026-09-16T00:00:00.000Z",
        updatedAt: "2026-09-16T00:00:00.000Z"
    },

    {
        id: "ZY-1003",
        name: "Zyaco Rice 2kg ( Double standard pack)",
        sku: "ZY-RIC-1003",
        barcode: 6500361002636,
        category: "grains",
        price: 85.00,
        stock: 11,
        lowStock: 10,
        status: "active",
        createdAt: "2026-09-16T00:00:00.000Z",
        updatedAt: "2026-09-16T00:00:00.000Z"
    },

    {
        id: "ZY-1004",
        name: "Zyaco Rice 1kg ( Standard pack",
        sku: "ZY-RIC-1004",
        barcode: 6500361007631,
        category: "grains",
        price: 45.00,
        stock: 11,
        lowStock: 15,
        status: "active",
        createdAt: "2026-09-16T00:00:00.000Z",
        updatedAt: "2026-09-16T00:00:00.000Z"
    },

    {
        id: "ZY-1005",
        name: "Zyaco Rice 500g ( Bursary pack)",
        sku: "ZY-RIC-1005",
        barcode: 6500361072639,
        category: "grains",
        price: 25.00,
        stock: 100,
        lowStock: 20,
        status: "active",
        createdAt: "2026-09-16T00:00:00.000Z",
        updatedAt: "2026-09-16T00:00:00.000Z"
    },

    {
        id: "ZY-1006",
        name: "Zyaco popcorn 1kg",
        sku: "ZY-POP-1006",
        barcode: 6500361032732,
        category: "grains",
        price:35.00,
        stock: 200,
        lowStock: 25,
        status: "active",
        createdAt: "2026-09-16T00:00:00.000Z",
        updatedAt: "2026-09-16T00:00:00.000Z"
    }

];

let editingProductId = null;


/* =========================================================
   LOAD PRODUCTS
========================================================= */

/* =========================================================
   LOAD PRODUCTS
========================================================= */

function loadProducts() {

    try {

        const saved =
            localStorage.getItem(
                PRODUCT_STORAGE_KEY
            );

        if (saved) {

            products = JSON.parse(saved);

            if (!Array.isArray(products)) {
                products = [...DEFAULT_PRODUCTS];
                saveProducts();
            }

        } else {

            /*
             * First installation:
             * populate the catalogue automatically.
             */

            products = DEFAULT_PRODUCTS.map(
                product => ({
                    ...product
                })
            );

            saveProducts();

        }

    } catch (error) {

        console.error(
            "Unable to load products:",
            error
        );

        products = DEFAULT_PRODUCTS.map(
            product => ({
                ...product
            })
        );

    }

}

function removeProducts(){
    localStorage.removeItem(PRODUCT_STORAGE_KEY);
    loadProducts();
}
resetKey.addEventListener('click',removeProducts);
/* =========================================================
   SAVE PRODUCTS
========================================================= */

function saveProducts() {

    localStorage.setItem(
        PRODUCT_STORAGE_KEY,
        JSON.stringify(products)
    );

}


/* =========================================================
   PRODUCT ID
========================================================= */

function generateProductId() {

    return (
        "PRD-" +
        Date.now() +
        "-" +
        Math.floor(
            Math.random() * 1000
        )
    );

}


/* =========================================================
   SIDEBAR OVERLAY
========================================================= */

const overlay =
    document.createElement("div");

overlay.className =
    "sidebar-overlay";

document.body.appendChild(overlay);


function openSidebar() {

    sidebar.classList.add("open");

    overlay.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeSidebar() {

    sidebar.classList.remove("open");

    overlay.classList.remove("active");

    document.body.style.overflow =
        "";
}


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            sidebar.classList.contains(
                "open"
            )
                ? closeSidebar()
                : openSidebar();

        }
    );

}


overlay.addEventListener(
    "click",
    closeSidebar
);


/* =========================================================
   NAVIGATION
========================================================= */

menuItems.forEach(item => {

    item.setAttribute(
        "tabindex",
        "0"
    );


    item.addEventListener(
        "click",
        () => {

            menuItems.forEach(
                menu =>
                    menu.classList.remove(
                        "active"
                    )
            );

            item.classList.add(
                "active"
            );

            if (
                window.innerWidth <= 850
            ) {
                closeSidebar();
            }

            handleNavigation(
                item.id
            );

        }
    );


    item.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                item.click();

            }

        }
    );

});


/* =========================================================
   NAVIGATION ROUTER
========================================================= */

function handleNavigation(id) {

    switch (id) {

        case "home":

            renderDashboard();

            break;


        case "prods":

            renderProductsModule();

            break;


case "barcodegen":

    renderBarcodeGenerator();

    break;

            break;


        case "QRcode":

            renderComingSoon(
                "QR Studio",
                "Create and manage QR codes."
            );

            break;

        case "label":

            renderLabelDesigner();

            break;


        case "printManager":

            renderComingSoon(
                "Print Manager",
                "Manage label and barcode print jobs."
            );

            break;


        case "settings":

            renderComingSoon(
                "Settings",
                "Configure Barcode Studio Pro."
            );

            break;

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    workspace.innerHTML = `

        <h3>
            Recent Activity
        </h3>

        <p>
            No recent activities available.
        </p>

    `;

}


/* =========================================================
   PRODUCTS MODULE
========================================================= */

function renderProductsModule() {

    workspace.innerHTML = `

        <div class="workspace-header">

            <div>

                <span class="section-eyebrow">
                    PRODUCT MANAGEMENT
                </span>

                <h3>
                    Product Catalogue
                </h3>

                <p>
                    Manage products, SKUs, barcodes and inventory information.
                </p>

            </div>

            <button
                class="primary-btn"
                id="addProductBtn"
                type="button">

                <span>＋</span>
                Add Product

            </button>

        </div>


        <div class="product-stats">

            <div class="product-stat">
                <span>Total Products</span>
                <strong id="totalProducts">0</strong>
            </div>

            <div class="product-stat">
                <span>Active Products</span>
                <strong id="activeProducts">0</strong>
            </div>

            <div class="product-stat">
                <span>Low Stock</span>
                <strong id="lowStockProducts">0</strong>
            </div>

            <div class="product-stat">
                <span>With Barcode</span>
                <strong id="barcodedProducts">0</strong>
            </div>

        </div>


        <div class="product-toolbar">

            <div class="product-search">

                <span>⌕</span>

                <input
                    type="search"
                    id="productSearch"
                    placeholder="Search products, SKU or barcode..."
                    autocomplete="off">

            </div>


            <select id="categoryFilter">

                <option value="all">
                    All Categories
                </option>

            </select>


            <select id="statusFilter">

                <option value="all">
                    All Status
                </option>

                <option value="active">
                    Active
                </option>

                <option value="inactive">
                    Inactive
                </option>

            </select>

        </div>


        <div class="products-table-wrapper">

            <table class="products-table">

                <thead>

                    <tr>

                        <th>Product</th>
                        <th>SKU</th>
                        <th>Barcode</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody id="productsTableBody"></tbody>

            </table>

        </div>


        <div
            class="products-empty"
            id="productsEmpty">

            <div class="empty-icon">
                📦
            </div>

            <h4>
                No products found
            </h4>

            <p>
                Add your first product to begin building your catalogue.
            </p>

            <button
                class="primary-btn"
                id="emptyAddProductBtn"
                type="button">

                ＋ Add First Product

            </button>

        </div>

    `;


    bindProductEvents();

    renderProductTable();

}


/* =========================================================
   PRODUCT EVENTS
========================================================= */

function bindProductEvents() {

    document
        .getElementById("addProductBtn")
        ?.addEventListener(
            "click",
            () => openProductModal()
        );


    document
        .getElementById("emptyAddProductBtn")
        ?.addEventListener(
            "click",
            () => openProductModal()
        );


    document
        .getElementById("productSearch")
        ?.addEventListener(
            "input",
            renderProductTable
        );


    document
        .getElementById("categoryFilter")
        ?.addEventListener(
            "change",
            renderProductTable
        );


    document
        .getElementById("statusFilter")
        ?.addEventListener(
            "change",
            renderProductTable
        );

}


/* =========================================================
   PRODUCT FILTERING
========================================================= */

function getFilteredProducts() {

    const search =
        document
            .getElementById("productSearch")
            ?.value
            .trim()
            .toLowerCase() || "";


    const category =
        document
            .getElementById("categoryFilter")
            ?.value || "all";


    const status =
        document
            .getElementById("statusFilter")
            ?.value || "all";


    return products.filter(product => {

        const searchable = [

            product.name,
            product.sku,
            product.barcode,
            product.category

        ]
            .join(" ")
            .toLowerCase();


        const matchesSearch =
            !search ||
            searchable.includes(
                search
            );


        const matchesCategory =
            category === "all" ||
            product.category === category;


        const matchesStatus =
            status === "all" ||
            product.status === status;


        return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
        );

    });

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProductTable() {

    const tbody =
        document.getElementById(
            "productsTableBody"
        );

    if (!tbody) return;


    updateProductStats();

    populateCategories();


    const filtered =
        getFilteredProducts();


    tbody.innerHTML = "";


    filtered.forEach(product => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="product-name">

                    <div class="product-image">
                        📦
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(
                                product.name
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                product.id
                            )}
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${escapeHTML(
                    product.sku || "—"
                )}
            </td>


            <td>
                ${escapeHTML(
                    product.barcode || "—"
                )}
            </td>


            <td>
                ${escapeHTML(
                    product.category || "Uncategorized"
                )}
            </td>


            <td>
                K${formatMoney(
                    product.price
                )}
            </td>


            <td>

                <span class="stock-badge ${
                    getStockClass(
                        product.stock
                    )
                }">

                    ${Number(
                        product.stock || 0
                    ).toLocaleString()}

                </span>

            </td>


            <td>

                <span class="status-badge ${
                    product.status === "active"
                        ? "active"
                        : "inactive"
                }">

                    ${
                        product.status === "active"
                            ? "Active"
                            : "Inactive"
                    }

                </span>

            </td>


            <td>

                <div class="product-actions">

                    <button
                        class="table-action"
                        title="Edit"
                        data-edit="${product.id}">

                        ✎

                    </button>

                    <button
                        class="table-action delete"
                        title="Delete"
                        data-delete="${product.id}">

                        ×

                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(row);

    });


    bindTableActions();


    const empty =
        document.getElementById(
            "productsEmpty"
        );


    if (empty) {

        empty.classList.toggle(
            "show",
            filtered.length === 0
        );

    }

}


/* =========================================================
   TABLE ACTIONS
========================================================= */

function bindTableActions() {

    document
        .querySelectorAll(
            "[data-edit]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editProduct(
                        button.dataset.edit
                    );

                }
            );

        });


    document
        .querySelectorAll(
            "[data-delete]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteProduct(
                        button.dataset.delete
                    );

                }
            );

        });

}


/* =========================================================
   PRODUCT STATS
========================================================= */

function updateProductStats() {

    const total =
        products.length;


    const active =
        products.filter(
            p => p.status === "active"
        ).length;


    const lowStock =
        products.filter(
            p =>
                Number(p.stock || 0) <=
                Number(p.lowStock || 5)
        ).length;


    const barcoded =
        products.filter(
            p =>
                p.barcode &&
                String(p.barcode).trim()
        ).length;


    const totalEl =
        document.getElementById(
            "totalProducts"
        );

    const activeEl =
        document.getElementById(
            "activeProducts"
        );

    const lowEl =
        document.getElementById(
            "lowStockProducts"
        );

    const barcodeEl =
        document.getElementById(
            "barcodedProducts"
        );


    if (totalEl)
        totalEl.textContent = total;


    if (activeEl)
        activeEl.textContent = active;


    if (lowEl)
        lowEl.textContent = lowStock;


    if (barcodeEl)
        barcodeEl.textContent = barcoded;

}


/* =========================================================
   CATEGORIES
========================================================= */

function populateCategories() {

    const select =
        document.getElementById(
            "categoryFilter"
        );

    if (!select) return;


    const current =
        select.value;


    const categories =
        [
            ...new Set(
                products
                    .map(
                        p =>
                            p.category
                    )
                    .filter(Boolean)
            )
        ]
        .sort();


    select.innerHTML = `

        <option value="all">
            All Categories
        </option>

    `;


    categories.forEach(category => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            category;

        option.textContent =
            category;

        select.appendChild(
            option
        );

    });


    if (
        categories.includes(current)
    ) {

        select.value =
            current;

    }

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProductModal(product = null) {

    editingProductId =
        product?.id || null;


    const overlay =
        document.createElement("div");

    overlay.className =
        "product-modal-overlay";


    overlay.id =
        "productModal";


    overlay.innerHTML = `

        <div class="product-modal">

            <div class="product-modal-header">

                <div>

                    <h3>
                        ${
                            product
                                ? "Edit Product"
                                : "Add Product"
                        }
                    </h3>

                    <p>
                        ${
                            product
                                ? "Update product information."
                                : "Create a new catalogue product."
                        }
                    </p>

                </div>

                <button
                    class="close-modal"
                    type="button"
                    id="closeProductModal">

                    ×

                </button>

            </div>


            <form
                class="product-form"
                id="productForm">

                <div class="form-grid">

                    <div class="form-group full">

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            id="productName"
                            required
                            value="${
                                escapeAttribute(
                                    product?.name || ""
                                )
                            }"
                            placeholder="e.g. ZYACO Tomato Sauce 500ml">

                    </div>


                    <div class="form-group">

                        <label>
                            SKU
                        </label>

                        <input
                            type="text"
                            id="productSku"
                            value="${
                                escapeAttribute(
                                    product?.sku || ""
                                )
                            }"
                            placeholder="e.g. ZY-TOM-500">

                    </div>


                    <div class="form-group">

                        <label>
                            Barcode
                        </label>

                        <input
                            type="text"
                            id="productBarcode"
                            value="${
                                escapeAttribute(
                                    product?.barcode || ""
                                )
                            }"
                            placeholder="EAN-13 / internal code">

                    </div>


                    <div class="form-group">

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            id="productCategory"
                            required
                            value="${
                                escapeAttribute(
                                    product?.category || ""
                                )
                            }"
                            placeholder="e.g. Sauces">

                    </div>


                    <div class="form-group">

                        <label>
                            Selling Price (ZMW)
                        </label>

                        <input
                            type="number"
                            id="productPrice"
                            required
                            min="0"
                            step="0.01"
                            value="${
                                product?.price ?? ""
                            }"
                            placeholder="0.00">

                    </div>


                    <div class="form-group">

                        <label>
                            Stock Quantity
                        </label>

                        <input
                            type="number"
                            id="productStock"
                            required
                            min="0"
                            step="1"
                            value="${
                                product?.stock ?? 0
                            }"
                            placeholder="0">

                    </div>


                    <div class="form-group">

                        <label>
                            Low Stock Threshold
                        </label>

                        <input
                            type="number"
                            id="productLowStock"
                            min="0"
                            step="1"
                            value="${
                                product?.lowStock ?? 5
                            }"
                            placeholder="5">

                        <small class="form-help">
                            Product is considered low stock at this level.
                        </small>

                    </div>


                    <div class="form-group">

                        <label>
                            Status
                        </label>

                        <select id="productStatus">

                            <option
                                value="active"
                                ${
                                    product?.status !== "inactive"
                                        ? "selected"
                                        : ""
                                }>

                                Active

                            </option>

                            <option
                                value="inactive"
                                ${
                                    product?.status === "inactive"
                                        ? "selected"
                                        : ""
                                }>

                                Inactive

                            </option>

                        </select>

                    </div>

                </div>


                <div class="form-footer">

                    <button
                        type="button"
                        class="secondary-btn"
                        id="cancelProduct">

                        Cancel

                    </button>

                    <button
                        type="submit"
                        class="primary-btn">

                        ${
                            product
                                ? "Save Changes"
                                : "Create Product"
                        }

                    </button>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    requestAnimationFrame(() => {

        overlay.classList.add(
            "show"
        );

    });


    document
        .getElementById(
            "closeProductModal"
        )
        .addEventListener(
            "click",
            closeProductModal
        );


    document
        .getElementById(
            "cancelProduct"
        )
        .addEventListener(
            "click",
            closeProductModal
        );


    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {
                closeProductModal();
            }

        }
    );


    document
        .getElementById(
            "productForm"
        )
        .addEventListener(
            "submit",
            saveProduct
        );


    setTimeout(() => {

        document
            .getElementById(
                "productName"
            )
            ?.focus();

    }, 200);

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProductModal() {

    const modal =
        document.getElementById(
            "productModal"
        );

    if (!modal) return;


    modal.classList.remove(
        "show"
    );


    setTimeout(() => {

        modal.remove();

        editingProductId = null;

    }, 220);

}


/* =========================================================
   SAVE PRODUCT
========================================================= */

function saveProduct(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "productName"
            )
            .value
            .trim();


    const sku =
        document
            .getElementById(
                "productSku"
            )
            .value
            .trim();


    const barcode =
        document
            .getElementById(
                "productBarcode"
            )
            .value
            .trim();


    const category =
        document
            .getElementById(
                "productCategory"
            )
            .value
            .trim();


    const price =
        Number(
            document
                .getElementById(
                    "productPrice"
                )
                .value
        );


    const stock =
        Number(
            document
                .getElementById(
                    "productStock"
                )
                .value
        );


    const lowStock =
        Number(
            document
                .getElementById(
                    "productLowStock"
                )
                .value
        );


    const status =
        document
            .getElementById(
                "productStatus"
            )
            .value;


    if (!name) {

        alert(
            "Please enter a product name."
        );

        return;
    }


    if (!category) {

        alert(
            "Please enter a product category."
        );

        return;
    }


    if (
        !Number.isFinite(price) ||
        price < 0
    ) {

        alert(
            "Please enter a valid selling price."
        );

        return;
    }


    if (
        !Number.isFinite(stock) ||
        stock < 0
    ) {

        alert(
            "Please enter a valid stock quantity."
        );

        return;
    }


    const duplicateSku =
        products.find(
            product =>
                product.sku &&
                sku &&
                product.sku.toLowerCase() ===
                    sku.toLowerCase() &&
                product.id !==
                    editingProductId
        );


    if (duplicateSku) {

        alert(
            "This SKU is already assigned to another product."
        );

        return;
    }


    const duplicateBarcode =
        products.find(
            product =>
                product.barcode &&
                barcode &&
                product.barcode === barcode &&
                product.id !==
                    editingProductId
        );


    if (duplicateBarcode) {

        alert(
            "This barcode is already assigned to another product."
        );

        return;
    }


    const now =
        new Date().toISOString();


    if (editingProductId) {

        const index =
            products.findIndex(
                product =>
                    product.id ===
                    editingProductId
            );


        if (index !== -1) {

            products[index] = {

                ...products[index],

                name,
                sku,
                barcode,
                category,
                price,
                stock,
                lowStock,
                status,

                updatedAt:
                    now

            };

        }

    } else {

        products.unshift({

            id:
                generateProductId(),

            name,
            sku,
            barcode,
            category,
            price,
            stock,
            lowStock:
                Number.isFinite(
                    lowStock
                )
                    ? lowStock
                    : 5,

            status,

            createdAt:
                now,

            updatedAt:
                now

        });

    }


    saveProducts();

    closeProductModal();

    renderProductsModule();

}


/* =========================================================
   EDIT PRODUCT
========================================================= */

function editProduct(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    openProductModal(
        product
    );

}


/* =========================================================
   DELETE PRODUCT
========================================================= */

function deleteProduct(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    const confirmed =
        window.confirm(
            `Delete "${product.name}"?`
        );


    if (!confirmed) return;


    products =
        products.filter(
            item =>
                item.id !== id
        );


    saveProducts();

    renderProductsModule();

}


/* =========================================================
   STOCK STATUS
========================================================= */

function getStockClass(stock) {

    const quantity =
        Number(stock || 0);


    if (quantity <= 0) {
        return "out";
    }


    if (quantity <= 5) {
        return "low";
    }


    return "good";

}


/* =========================================================
   MONEY
========================================================= */

function formatMoney(value) {

    return Number(
        value || 0
    ).toLocaleString(
        "en-ZM",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}


/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(value) {

    return escapeHTML(value);

}


/* =========================================================
   COMING SOON MODULE
========================================================= */

function renderComingSoon(
    title,
    description
) {

    workspace.innerHTML = `

        <div style="
            min-height:380px;
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;
            text-align:center;
            padding:30px;
        ">

            <div style="
                width:70px;
                height:70px;
                display:flex;
                align-items:center;
                justify-content:center;
                margin-bottom:18px;
                border-radius:20px;
                background:#ecfdf5;
                color:#0f766e;
                font-size:28px;
            ">

                ✦

            </div>

            <span style="
                color:#0f766e;
                font-size:9px;
                font-weight:800;
                letter-spacing:1px;
                text-transform:uppercase;
            ">

                BARCODE STUDIO PRO

            </span>

            <h3 style="
                margin-top:7px;
                color:#0f172a;
                font-size:21px;
            ">

                ${escapeHTML(title)}

            </h3>

            <p style="
                max-width:420px;
                margin-top:8px;
                color:#64748b;
                font-size:11px;
                line-height:1.7;
            ">

                ${escapeHTML(description)}

            </p>

        </div>

    `;

}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeSidebar();

            closeProductModal();

        }

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "b"
        ) {

            event.preventDefault();

            sidebar.classList.contains(
                "open"
            )
                ? closeSidebar()
                : openSidebar();

        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 850
        ) {

            closeSidebar();

        }

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProducts();

        /*
         * Dashboard is shown initially.
         */

    }
);


/* =========================================================
   PUBLIC API
========================================================= */

window.BarcodeStudio = {

    products,

    loadProducts,

    saveProducts,

    renderProducts:
        renderProductsModule,

    openSidebar,

    closeSidebar

};

/* =========================================================
   BARCODE GENERATOR
========================================================= */

function renderBarcodeGenerator() {

    workspace.innerHTML = `

        <div class="barcode-studio">

            <div class="barcode-studio-header">

                <div>

                    <span class="section-eyebrow">
                        BARCODE STUDIO
                    </span>

                    <h3>
                        Professional Barcode Generator
                    </h3>

                    <p>
                        Generate product-ready barcodes connected to your catalogue.
                    </p>

                </div>

            </div>


            <div class="barcode-layout">


                <!-- =====================================
                     GENERATOR
                ====================================== -->

                <div class="barcode-generator-panel">

                    <div class="barcode-panel-title">

                        <span>
                            CREATE BARCODE
                        </span>

                        <h4>
                            Barcode Configuration
                        </h4>

                        <p>
                            Select a product and barcode format.
                        </p>

                    </div>


                    <div class="barcode-form-group">

                        <label>
                            Product
                        </label>

                        <div class="barcode-product-select">

                            <select id="barcodeProduct">

                                <option value="">
                                    Select product
                                </option>

                            </select>

                        </div>

                    </div>


                    <div class="barcode-form-group">

                        <label>
                            Barcode Type
                        </label>

                        <div class="barcode-type-grid">

                            <div
                                class="barcode-type-card active"
                                data-type="EAN13">

                                <strong>
                                    EAN-13
                                </strong>

                                <small>
                                    Retail / GS1
                                </small>

                            </div>


                            <div
                                class="barcode-type-card"
                                data-type="CODE128">

                                <strong>
                                    CODE 128
                                </strong>

                                <small>
                                    Universal
                                </small>

                            </div>


                            <div
                                class="barcode-type-card"
                                data-type="INTERNAL">

                                <strong>
                                    INTERNAL
                                </strong>

                                <small>
                                    Custom
                                </small>

                            </div>

                        </div>

                    </div>


                    <div class="barcode-form-group">

                        <label>
                            Barcode Value
                        </label>

                        <input
                            type="text"
                            id="barcodeValue"
                            placeholder="Select product first">

                        <div
                            class="barcode-form-help"
                            id="barcodeHelp">

                            EAN-13 requires 12 base digits.
                            The final check digit is calculated automatically.

                        </div>

                        <div
                            class="barcode-validation"
                            id="barcodeValidation">
                        </div>

                    </div>


                    <button
                        type="button"
                        class="generate-barcode-btn"
                        id="generateBarcodeBtn">

                        ▣ Generate Barcode

                    </button>

                </div>


                <!-- =====================================
                     PREVIEW
                ====================================== -->

                <div class="barcode-preview-panel">

                    <div class="barcode-preview-header">

                        <h4>
                            Live Preview
                        </h4>

                        <p>
                            Preview exactly what will be printed.
                        </p>

                    </div>


                    <div class="barcode-preview-area">

                        <div
                            class="barcode-empty-preview"
                            id="barcodeEmptyPreview">

                            <div class="barcode-empty-icon">
                                ▥
                            </div>

                            <strong>
                                Barcode Preview
                            </strong>

                            <p>
                                Select a product and generate a barcode
                                to see the result here.
                            </p>

                        </div>


                        <div
                            class="barcode-result"
                            id="barcodeResult">

                            <svg
                                id="barcodeSvg">
                            </svg>

                            <div
                                class="barcode-product-name"
                                id="barcodeProductName">
                            </div>

                            <div
                                class="barcode-number"
                                id="barcodeNumber">
                            </div>


                            <div class="barcode-info">

                                <div class="barcode-info-item">

                                    <span>
                                        Type
                                    </span>

                                    <strong
                                        id="barcodeInfoType">
                                        —
                                    </strong>

                                </div>


                                <div class="barcode-info-item">

                                    <span>
                                        Format
                                    </span>

                                    <strong
                                        id="barcodeInfoFormat">
                                        —
                                    </strong>

                                </div>


                                <div class="barcode-info-item">

                                    <span>
                                        Status
                                    </span>

                                    <strong
                                        id="barcodeInfoStatus">
                                        Ready
                                    </strong>

                                </div>

                            </div>


                            <div class="barcode-actions">

                                <button
                                    type="button"
                                    class="barcode-action primary"
                                    id="saveBarcodeBtn">

                                    Save to Product

                                </button>

                                <button
                                    type="button"
                                    class="barcode-action"
                                    id="downloadBarcodeBtn">

                                    Download SVG

                                </button>

                                <button
                                    type="button"
                                    class="barcode-action"
                                    id="printBarcodeBtn">

                                    Print

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;


    populateBarcodeProducts();

    bindBarcodeEvents();

}


/* =========================================================
   POPULATE PRODUCTS
========================================================= */

function populateBarcodeProducts() {

    const select =
        document.getElementById(
            "barcodeProduct"
        );

    if (!select) return;


    products.forEach(product => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            product.id;

        option.textContent =
            `${product.name} ${
                product.sku
                    ? `— ${product.sku}`
                    : ""
            }`;

        select.appendChild(
            option
        );

    });

}


/* =========================================================
   BARCODE STATE
========================================================= */

let selectedBarcodeType =
    "EAN13";

let generatedBarcode =
    null;


/* =========================================================
   BARCODE EVENTS
========================================================= */

function bindBarcodeEvents() {

    const productSelect =
        document.getElementById(
            "barcodeProduct"
        );


    const valueInput =
        document.getElementById(
            "barcodeValue"
        );


    const generateButton =
        document.getElementById(
            "generateBarcodeBtn"
        );


    productSelect?.addEventListener(
        "change",
        () => {

            const product =
                products.find(
                    p =>
                        p.id ===
                        productSelect.value
                );


            if (!product) {

                valueInput.value = "";

                valueInput.placeholder =
                    "Select product first";

                return;

            }


            let value =
                product.barcode || "";


            if (
                selectedBarcodeType ===
                "EAN13"
            ) {

                /*
                 * Existing EAN-13
                 */

                if (
                    /^\d{13}$/.test(value)
                ) {

                    valueInput.value =
                        value;

                } else {

                    valueInput.value =
                        createEAN13Base(
                            product
                        );

                }

            } else if (
                selectedBarcodeType ===
                "CODE128"
            ) {

                valueInput.value =
                    value ||
                    product.sku ||
                    createInternalCode(
                        product
                    );

            } else {

                valueInput.value =
                    product.sku ||
                    createInternalCode(
                        product
                    );

            }

        }
    );


    document
        .querySelectorAll(
            ".barcode-type-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".barcode-type-card"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    card.classList.add(
                        "active"
                    );


                    selectedBarcodeType =
                        card.dataset.type;


                    updateBarcodeInput();

                }
            );

        });


    valueInput?.addEventListener(
        "input",
        validateBarcodeInput
    );


    generateButton?.addEventListener(
        "click",
        generateBarcode
    );


    document
        .getElementById(
            "saveBarcodeBtn"
        )
        ?.addEventListener(
            "click",
            saveGeneratedBarcode
        );


    document
        .getElementById(
            "downloadBarcodeBtn"
        )
        ?.addEventListener(
            "click",
            downloadBarcode
        );


    document
        .getElementById(
            "printBarcodeBtn"
        )
        ?.addEventListener(
            "click",
            printBarcode
        );

}


/* =========================================================
   UPDATE INPUT
========================================================= */

function updateBarcodeInput() {

    const productId =
        document.getElementById(
            "barcodeProduct"
        )?.value;


    const input =
        document.getElementById(
            "barcodeValue"
        );


    if (!input) return;


    const product =
        products.find(
            p =>
                p.id === productId
        );


    if (!product) return;


    if (
        selectedBarcodeType ===
        "EAN13"
    ) {

        if (
            /^\d{13}$/.test(
                product.barcode || ""
            )
        ) {

            input.value =
                product.barcode;

        } else {

            input.value =
                createEAN13Base(
                    product
                );

        }

    } else if (
        selectedBarcodeType ===
        "CODE128"
    ) {

        input.value =
            product.barcode ||
            product.sku ||
            createInternalCode(
                product
            );

    } else {

        input.value =
            product.sku ||
            createInternalCode(
                product
            );

    }

    validateBarcodeInput();

}


/* =========================================================
   EAN-13
========================================================= */

function calculateEAN13CheckDigit(
    digits
) {

    const numbers =
        String(digits)
            .replace(/\D/g, "")
            .slice(0, 12);


    if (numbers.length !== 12) {
        return null;
    }


    let sum = 0;


    for (
        let i = 0;
        i < numbers.length;
        i++
    ) {

        const digit =
            Number(
                numbers[i]
            );


        sum +=
            i % 2 === 0
                ? digit
                : digit * 3;

    }


    return (
        (10 - (sum % 10)) %
        10
    );

}


function createEAN13Base(product) {

    /*
     * Internal EAN-compatible placeholder.
     *
     * For commercial GS1 usage,
     * replace this with your officially
     * assigned GS1 company prefix.
     */

    const seed =
        String(
            Math.abs(
                hashString(
                    product.id
                )
            )
        )
        .padStart(
            11,
            "0"
        )
        .slice(
            0,
            11
        );


    return seed +
        calculateEAN13CheckDigit(
            seed
        );

}


/* =========================================================
   INTERNAL CODE
========================================================= */

function createInternalCode(product) {

    const numeric =
        Math.abs(
            hashString(
                product.id
            )
        )
        .toString()
        .slice(
            0,
            8
        );


    return `ZY-${numeric}`;

}


/* =========================================================
   SIMPLE HASH
========================================================= */

function hashString(value) {

    let hash = 0;


    for (
        let i = 0;
        i < value.length;
        i++
    ) {

        hash =
            (
                (hash << 5) -
                hash +
                value.charCodeAt(i)
            ) |
            0;

    }


    return hash;

}


/* =========================================================
   VALIDATE BARCODE
========================================================= */

function validateBarcodeInput() {

    const input =
        document.getElementById(
            "barcodeValue"
        );


    const validation =
        document.getElementById(
            "barcodeValidation"
        );


    if (!input || !validation) {
        return false;
    }


    const value =
        input.value.trim();


    validation.className =
        "barcode-validation";


    validation.textContent =
        "";


    if (!value) {

        return false;

    }


    if (
        selectedBarcodeType ===
        "EAN13"
    ) {

        if (
            !/^\d{13}$/.test(
                value
            )
        ) {

            validation.classList.add(
                "show",
                "error"
            );

            validation.textContent =
                "EAN-13 must contain exactly 13 digits.";

            return false;

        }


        const check =
            calculateEAN13CheckDigit(
                value.slice(0, 12)
            );


        if (
            Number(
                value[12]
            ) !== check
        ) {

            validation.classList.add(
                "show",
                "error"
            );

            validation.textContent =
                `Invalid EAN-13 check digit. Expected ${check}.`;

            return false;

        }


        validation.classList.add(
            "show",
            "success"
        );

        validation.textContent =
            "Valid EAN-13 barcode.";

        return true;

    }


    if (
        selectedBarcodeType ===
        "CODE128"
    ) {

        validation.classList.add(
            "show",
            "success"
        );

        validation.textContent =
            "Valid Code 128 value.";

        return true;

    }


    if (
        selectedBarcodeType ===
        "INTERNAL"
    ) {

        validation.classList.add(
            "show",
            "success"
        );

        validation.textContent =
            "Valid internal product code.";

        return true;

    }


    return false;

}


/* =========================================================
   GENERATE
========================================================= */

function generateBarcode() {

    const productId =
        document.getElementById(
            "barcodeProduct"
        ).value;


    const valueInput =
        document.getElementById(
            "barcodeValue"
        );


    const value =
        valueInput.value.trim();


    const product =
        products.find(
            p =>
                p.id === productId
        );


    if (!product) {

        alert(
            "Please select a product first."
        );

        return;

    }


    if (!validateBarcodeInput()) {

        return;

    }


    let finalValue =
        value;


    /*
     * EAN-13 always uses
     * the complete 13-digit value.
     */

    if (
        selectedBarcodeType ===
        "EAN13"
    ) {

        finalValue =
            value;

    }


    const svg =
        document.getElementById(
            "barcodeSvg"
        );


    try {

        JsBarcode(
            svg,
            finalValue,
            {

                format:
                    selectedBarcodeType ===
                    "EAN13"
                        ? "ean13"
                        : "CODE128",

                width: 2,

                height: 90,

                displayValue: true,

                font:
                    "Inter",

                fontSize: 14,

                fontOptions:
                    "600",

                textMargin: 7,

                margin: 10,

                lineColor:
                    "#111827",

                background:
                    "#ffffff"

            }
        );


        generatedBarcode = {

            productId:
                product.id,

            value:
                finalValue,

            type:
                selectedBarcodeType,

            generatedAt:
                new Date().toISOString()

        };


        showBarcodeResult(
            product,
            finalValue
        );


    } catch (error) {

        console.error(
            "Barcode generation failed:",
            error
        );

        alert(
            "Unable to generate this barcode."
        );

    }

}


/* =========================================================
   SHOW RESULT
========================================================= */

function showBarcodeResult(
    product,
    value
) {

    document
        .getElementById(
            "barcodeEmptyPreview"
        )
        .style.display =
            "none";


    document
        .getElementById(
            "barcodeResult"
        )
        .classList.add(
            "show"
        );


    document
        .getElementById(
            "barcodeProductName"
        )
        .textContent =
            product.name;


    document
        .getElementById(
            "barcodeNumber"
        )
        .textContent =
            value;


    document
        .getElementById(
            "barcodeInfoType"
        )
        .textContent =
            getBarcodeTypeName(
                selectedBarcodeType
            );


    document
        .getElementById(
            "barcodeInfoFormat"
        )
        .textContent =
            value.length +
            " characters";


    document
        .getElementById(
            "barcodeInfoStatus"
        )
        .textContent =
            "Ready";

}


/* =========================================================
   TYPE NAME
========================================================= */

function getBarcodeTypeName(type) {

    const names = {

        EAN13:
            "EAN-13",

        CODE128:
            "Code 128",

        INTERNAL:
            "Internal"

    };


    return names[type] ||
        type;

}


/* =========================================================
   SAVE BARCODE TO PRODUCT
========================================================= */

function saveGeneratedBarcode() {

    if (!generatedBarcode) {

        alert(
            "Generate a barcode first."
        );

        return;

    }


    const product =
        products.find(
            p =>
                p.id ===
                generatedBarcode.productId
        );


    if (!product) {

        alert(
            "Product could not be found."
        );

        return;

    }


    product.barcode =
        generatedBarcode.value;


    product.barcodeType =
        generatedBarcode.type;


    product.barcodeUpdatedAt =
        new Date().toISOString();


    saveProducts();


    const status =
        document.getElementById(
            "barcodeInfoStatus"
        );


    if (status) {

        status.textContent =
            "Saved";

    }

}


/* =========================================================
   DOWNLOAD SVG
========================================================= */

function downloadBarcode() {

    if (!generatedBarcode) {

        alert(
            "Generate a barcode first."
        );

        return;

    }


    const svg =
        document.getElementById(
            "barcodeSvg"
        );


    if (!svg) return;


    const serializer =
        new XMLSerializer();


    const source =
        serializer.serializeToString(
            svg
        );


    const blob =
        new Blob(
            [
                source
            ],
            {
                type:
                    "image/svg+xml"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        `${generatedBarcode.value}.svg`;


    document.body.appendChild(
        link
    );


    link.click();

    link.remove();


    URL.revokeObjectURL(
        url
    );

}


/* =========================================================
   PRINT BARCODE
========================================================= */

function printBarcode() {

    if (!generatedBarcode) {

        alert(
            "Generate a barcode first."
        );

        return;

    }


    const svg =
        document.getElementById(
            "barcodeSvg"
        );


    const product =
        products.find(
            p =>
                p.id ===
                generatedBarcode.productId
        );


    if (!svg || !product) {
        return;
    }


    const svgData =
        new XMLSerializer()
            .serializeToString(
                svg
            );


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=700,height=500"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print the barcode."
        );

        return;

    }


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Barcode - ${escapeHTML(product.name)}
            </title>

            <style>

                * {
                    box-sizing: border-box;
                }

                body {

                    margin: 0;

                    min-height: 100vh;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    font-family:
                        Arial,
                        sans-serif;

                }

                .label {

                    width: 420px;

                    padding: 30px;

                    text-align: center;

                }

                .product {

                    margin-bottom: 15px;

                    font-size: 16px;

                    font-weight: 700;

                }

                svg {

                    max-width: 100%;

                    height: auto;

                }

                @media print {

                    @page {

                        margin: 8mm;

                    }

                    .label {

                        width: 100%;

                    }

                }

            </style>

        </head>

        <body>

            <div class="label">

                <div class="product">

                    ${escapeHTML(product.name)}

                </div>

                ${svgData}

            </div>

            <script>

                window.onload = function() {

                    window.print();

                };

            <\/script>

        </body>

        </html>

    `);


    printWindow.document.close();

}


/* =========================================================
   END BARCODE GENERATOR
========================================================= */

/* =========================================================
   LABEL DESIGNER
========================================================= */

function renderLabelDesigner() {

    workspace.innerHTML = `

        <section class="label-studio">

            <div class="label-studio-header">

                <div>
                    <span class="section-eyebrow">
                        LABEL DESIGNER
                    </span>

                    <h3>
                        Professional Product Label Designer
                    </h3>

                    <p>
                        Create printable product labels directly
                        from your product catalogue.
                    </p>
                </div>

                <div class="label-header-status">
                    <span class="status-dot"></span>
                    Live Preview
                </div>

            </div>


            <div class="label-designer-layout">


                <!-- =====================================
                     CONTROLS
                ====================================== -->

                <div class="label-controls-panel">

                    <div class="label-panel-heading">

                        <span>
                            LABEL CONFIGURATION
                        </span>

                        <h4>
                            Design Settings
                        </h4>

                    </div>


                    <!-- PRODUCT -->

                    <div class="label-form-group">

                        <label>
                            Product
                        </label>

                        <select id="labelProduct">

                            <option value="">
                                Select product
                            </option>

                        </select>

                    </div>


                    <!-- LABEL SIZE -->

                    <div class="label-form-group">

                        <label>
                            Label Size
                        </label>

                        <select id="labelSize">

                            <option value="58x40">
                                58 × 40 mm
                            </option>

                            <option value="60x40">
                                60 × 40 mm
                            </option>

                            <option value="70x50">
                                70 × 50 mm
                            </option>

                            <option value="80x50">
                                80 × 50 mm
                            </option>

                            <option value="100x70">
                                100 × 70 mm
                            </option>

                        </select>

                    </div>


                    <!-- PRODUCT NAME -->

                    <div class="label-form-group">

                        <label>
                            Product Name
                        </label>

                        <input
                            id="labelProductName"
                            type="text"
                            placeholder="Product name">

                    </div>


                    <!-- PRICE -->

                    <div class="label-two-columns">

                        <div class="label-form-group">

                            <label>
                                Price
                            </label>

                            <input
                                id="labelPrice"
                                type="text"
                                placeholder="K0.00">

                        </div>


                        <div class="label-form-group">

                            <label>
                                SKU
                            </label>

                            <input
                                id="labelSKU"
                                type="text"
                                placeholder="SKU">

                        </div>

                    </div>


                    <!-- BATCH -->

                    <div class="label-two-columns">

                        <div class="label-form-group">

                            <label>
                                Batch Number
                            </label>

                            <input
                                id="labelBatch"
                                type="text"
                                placeholder="Batch">

                        </div>


                        <div class="label-form-group">

                            <label>
                                Expiry Date
                            </label>

                            <input
                                id="labelExpiry"
                                type="date">

                        </div>

                    </div>


                    <!-- COMPANY -->

                    <div class="label-form-group">

                        <label>
                            Company Name
                        </label>

                        <input
                            id="labelCompany"
                            type="text"
                            value="ZYACO FOODS">

                    </div>


                    <!-- DISPLAY OPTIONS -->

                    <div class="label-options">

                        <div class="label-options-title">
                            Label Elements
                        </div>


                        <label class="label-switch-row">

                            <span>
                                Product Price
                            </span>

                            <input
                                type="checkbox"
                                id="showLabelPrice"
                                checked>

                        </label>


                        <label class="label-switch-row">

                            <span>
                                SKU
                            </span>

                            <input
                                type="checkbox"
                                id="showLabelSKU"
                                checked>

                        </label>


                        <label class="label-switch-row">

                            <span>
                                Batch Number
                            </span>

                            <input
                                type="checkbox"
                                id="showLabelBatch"
                                checked>

                        </label>


                        <label class="label-switch-row">

                            <span>
                                Expiry Date
                            </span>

                            <input
                                type="checkbox"
                                id="showLabelExpiry"
                                checked>

                        </label>


                        <label class="label-switch-row">

                            <span>
                                Barcode
                            </span>

                            <input
                                type="checkbox"
                                id="showLabelBarcode"
                                checked>

                        </label>

                    </div>


                    <div class="label-control-actions">

                        <button
                            class="label-btn primary"
                            id="printLabelBtn">

                            🖨 Print Label

                        </button>

                        <button
                            class="label-btn"
                            id="saveLabelBtn">

                            Save Design

                        </button>

                    </div>

                </div>



                <!-- =====================================
                     PREVIEW
                ====================================== -->

                <div class="label-preview-panel">

                    <div class="label-preview-toolbar">

                        <div>

                            <strong>
                                Label Preview
                            </strong>

                            <span>
                                Changes update instantly
                            </span>

                        </div>

                        <span id="labelDimension">
                            58 × 40 mm
                        </span>

                    </div>


                    <div class="label-preview-stage">

                        <div
                            id="labelPreview"
                            class="print-label">

                            <div class="label-company"
                                 id="previewCompany">
                                ZYACO FOODS
                            </div>


                            <div
                                class="label-product-name"
                                id="previewProductName">
                                Product Name
                            </div>


                            <div
                                class="label-price"
                                id="previewPrice">
                                K0.00
                            </div>


                            <div class="label-divider"></div>


                            <div
                                class="label-meta">

                                <div
                                    id="previewSKU">
                                    SKU: —
                                </div>

                                <div
                                    id="previewBatch">
                                    Batch: —
                                </div>

                                <div
                                    id="previewExpiry">
                                    EXP: —
                                </div>

                            </div>


                            <div
                                class="label-barcode-container"
                                id="previewBarcodeContainer">

                                <svg
                                    id="labelBarcode">
                                </svg>

                            </div>


                            <div
                                class="label-barcode-number"
                                id="previewBarcodeNumber">
                                —
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    `;


    populateLabelProducts();

    bindLabelDesigner();

    updateLabelPreview();

}


/* =========================================================
   PRODUCTS
========================================================= */

function populateLabelProducts() {

    const select =
        document.getElementById(
            "labelProduct"
        );

    if (!select) return;


    products.forEach(product => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            product.id;

        option.textContent =
            product.name;

        select.appendChild(
            option
        );

    });

}


/* =========================================================
   EVENTS
========================================================= */

function bindLabelDesigner() {

    const productSelect =
        document.getElementById(
            "labelProduct"
        );


    productSelect?.addEventListener(
        "change",
        loadSelectedLabelProduct
    );


    document
        .querySelectorAll(
            ".label-controls-panel input, .label-controls-panel select"
        )
        .forEach(element => {

            element.addEventListener(
                "input",
                updateLabelPreview
            );

            element.addEventListener(
                "change",
                updateLabelPreview
            );

        });


    document
        .getElementById(
            "printLabelBtn"
        )
        ?.addEventListener(
            "click",
            printProductLabel
        );


    document
        .getElementById(
            "saveLabelBtn"
        )
        ?.addEventListener(
            "click",
            saveLabelDesign
        );

}


/* =========================================================
   LOAD PRODUCT
========================================================= */

function loadSelectedLabelProduct() {

    const productId =
        document.getElementById(
            "labelProduct"
        ).value;


    const product =
        products.find(
            product =>
                product.id ===
                productId
        );


    if (!product) return;


    document
        .getElementById(
            "labelProductName"
        )
        .value =
            product.name || "";


    document
        .getElementById(
            "labelPrice"
        )
        .value =
            product.price != null
                ? `K${Number(
                    product.price
                ).toFixed(2)}`
                : "";


    document
        .getElementById(
            "labelSKU"
        )
        .value =
            product.sku || "";


    updateLabelPreview();

}


/* =========================================================
   PREVIEW
========================================================= */

function updateLabelPreview() {

    const productName =
        document.getElementById(
            "labelProductName"
        )?.value ||
        "Product Name";


    const price =
        document.getElementById(
            "labelPrice"
        )?.value ||
        "K0.00";


    const sku =
        document.getElementById(
            "labelSKU"
        )?.value ||
        "—";


    const batch =
        document.getElementById(
            "labelBatch"
        )?.value ||
        "—";


    const expiry =
        document.getElementById(
            "labelExpiry"
        )?.value;


    const company =
        document.getElementById(
            "labelCompany"
        )?.value ||
        "ZYACO FOODS";


    document
        .getElementById(
            "previewCompany"
        )
        .textContent =
            company;


    document
        .getElementById(
            "previewProductName"
        )
        .textContent =
            productName;


    document
        .getElementById(
            "previewPrice"
        )
        .textContent =
            price;


    document
        .getElementById(
            "previewSKU"
        )
        .textContent =
            `SKU: ${sku}`;


    document
        .getElementById(
            "previewBatch"
        )
        .textContent =
            `Batch: ${batch}`;


    document
        .getElementById(
            "previewExpiry"
        )
        .textContent =
            `EXP: ${
                expiry
                    ? formatLabelDate(
                        expiry
                    )
                    : "—"
            }`;


    updateLabelVisibility();

    updateLabelSize();

    updateLabelBarcode();

}


/* =========================================================
   VISIBILITY
========================================================= */

function updateLabelVisibility() {

    const price =
        document.getElementById(
            "showLabelPrice"
        ).checked;


    const sku =
        document.getElementById(
            "showLabelSKU"
        ).checked;


    const batch =
        document.getElementById(
            "showLabelBatch"
        ).checked;


    const expiry =
        document.getElementById(
            "showLabelExpiry"
        ).checked;


    const barcode =
        document.getElementById(
            "showLabelBarcode"
        ).checked;


    document
        .getElementById(
            "previewPrice"
        )
        .style.display =
            price
                ? "block"
                : "none";


    document
        .getElementById(
            "previewSKU"
        )
        .style.display =
            sku
                ? "block"
                : "none";


    document
        .getElementById(
            "previewBatch"
        )
        .style.display =
            batch
                ? "block"
                : "none";


    document
        .getElementById(
            "previewExpiry"
        )
        .style.display =
            expiry
                ? "block"
                : "none";


    document
        .getElementById(
            "previewBarcodeContainer"
        )
        .style.display =
            barcode
                ? "block"
                : "none";


    document
        .getElementById(
            "previewBarcodeNumber"
        )
        .style.display =
            barcode
                ? "block"
                : "none";

}


/* =========================================================
   LABEL SIZE
========================================================= */

function updateLabelSize() {

    const size =
        document.getElementById(
            "labelSize"
        ).value;


    const [
        width,
        height
    ] =
        size.split("x");


    const label =
        document.getElementById(
            "labelPreview"
        );


    label.style.width =
        `${width}mm`;


    label.style.height =
        `${height}mm`;


    document
        .getElementById(
            "labelDimension"
        )
        .textContent =
            `${width} × ${height} mm`;

}


/* =========================================================
   BARCODE
========================================================= */

function updateLabelBarcode() {

    const container =
        document.getElementById(
            "previewBarcodeContainer"
        );


    if (
        container.style.display ===
        "none"
    ) {

        return;

    }


    const productId =
        document.getElementById(
            "labelProduct"
        )?.value;


    const product =
        products.find(
            product =>
                product.id ===
                productId
        );


    if (!product) {

        clearLabelBarcode();

        return;

    }


    let value =
        product.barcode;


    if (!value) {

        value =
            product.sku ||
            createInternalCode(
                product
            );

    }


    const barcode =
        document.getElementById(
            "labelBarcode"
        );


    try {

        const format =
            /^\d{13}$/.test(value)
                ? "ean13"
                : "CODE128";


        JsBarcode(
            barcode,
            value,
            {

                format,

                width: 1.4,

                height: 38,

                displayValue: false,

                margin: 2,

                background:
                    "transparent",

                lineColor:
                    "#111827"

            }
        );


        document
            .getElementById(
                "previewBarcodeNumber"
            )
            .textContent =
                value;

    } catch {

        clearLabelBarcode();

    }

}


/* =========================================================
   CLEAR BARCODE
========================================================= */

function clearLabelBarcode() {

    const barcode =
        document.getElementById(
            "labelBarcode"
        );


    if (barcode) {

        barcode.innerHTML =
            "";

    }


    const number =
        document.getElementById(
            "previewBarcodeNumber"
        );


    if (number) {

        number.textContent =
            "—";

    }

}


/* =========================================================
   DATE
========================================================= */

function formatLabelDate(
    value
) {

    if (!value) {
        return "—";
    }


    const date =
        new Date(
            `${value}T00:00:00`
        );


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


/* =========================================================
   SAVE LABEL DESIGN
========================================================= */

function saveLabelDesign() {

    const productId =
        document.getElementById(
            "labelProduct"
        ).value;


    if (!productId) {

        alert(
            "Please select a product first."
        );

        return;

    }


    const design = {

        id:
            `LABEL-${Date.now()}`,

        productId,

        size:
            document.getElementById(
                "labelSize"
            ).value,

        productName:
            document.getElementById(
                "labelProductName"
            ).value,

        price:
            document.getElementById(
                "labelPrice"
            ).value,

        sku:
            document.getElementById(
                "labelSKU"
            ).value,

        batch:
            document.getElementById(
                "labelBatch"
            ).value,

        expiry:
            document.getElementById(
                "labelExpiry"
            ).value,

        company:
            document.getElementById(
                "labelCompany"
            ).value,

        options: {

            price:
                document.getElementById(
                    "showLabelPrice"
                ).checked,

            sku:
                document.getElementById(
                    "showLabelSKU"
                ).checked,

            batch:
                document.getElementById(
                    "showLabelBatch"
                ).checked,

            expiry:
                document.getElementById(
                    "showLabelExpiry"
                ).checked,

            barcode:
                document.getElementById(
                    "showLabelBarcode"
                ).checked

        },

        createdAt:
            new Date().toISOString()

    };


    const saved =
        JSON.parse(
            localStorage.getItem(
                "barcode_label_designs"
            ) || "[]"
        );


    saved.push(
        design
    );


    localStorage.setItem(
        "barcode_label_designs",
        JSON.stringify(
            saved
        )
    );


    const button =
        document.getElementById(
            "saveLabelBtn"
        );


    const original =
        button.textContent;


    button.textContent =
        "✓ Design Saved";


    button.disabled =
        true;


    setTimeout(() => {

        button.textContent =
            original;

        button.disabled =
            false;

    }, 1800);

}


/* =========================================================
   PRINT
========================================================= */

function printProductLabel() {

    const label =
        document.getElementById(
            "labelPreview"
        );


    if (!label) return;


    const productName =
        document.getElementById(
            "labelProductName"
        ).value ||
        "Product Label";


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=700,height=700"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print labels."
        );

        return;

    }


    const labelHTML =
        label.outerHTML;


    const width =
        document
            .getElementById(
                "labelSize"
            )
            .value
            .split("x")[0];


    const height =
        document
            .getElementById(
                "labelSize"
            )
            .value
            .split("x")[1];


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                ${escapeHTML(productName)}
            </title>

            <style>

                * {
                    box-sizing: border-box;
                }

                html,
                body {

                    margin: 0;

                    padding: 0;

                    background: white;

                }

                body {

                    display: flex;

                    align-items: flex-start;

                    justify-content: center;

                    padding: 10mm;

                    font-family:
                        Inter,
                        Arial,
                        sans-serif;

                }

                .print-label {

                    width:
                        ${width}mm !important;

                    height:
                        ${height}mm !important;

                    overflow: hidden;

                    border: none !important;

                    box-shadow: none !important;

                }

                @page {

                    size:
                        ${width}mm
                        ${height}mm;

                    margin: 0;

                }

                @media print {

                    body {

                        padding: 0;

                    }

                }

            </style>

        </head>

        <body>

            ${labelHTML}

            <script>

                window.onload = function() {

                    setTimeout(
                        function() {
                            window.print();
                        },
                        300
                    );

                };

            <\/script>

        </body>

        </html>

    `);


    printWindow.document.close();

}