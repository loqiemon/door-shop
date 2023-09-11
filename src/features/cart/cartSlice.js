import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [
        {name: "Metal door", id: 1, description: "The Sheet Metal Door is the most common door found on bases due to its resistances to melee weapons and fire but relatively cheap cost to craft. Regardless, it is still relatively weak to explosives compared to its expensive indirect upgrade, the 'Armoured Door'.", image: "../../../public/images/doors/door.hinged.metal.png", price: 53000},
        {name: "Armored Door", id: 2, description: "The Armored Door is the highest tier door and is the best option for base defense. If the door is put on a weaker door frame, the door frame will be targeted instead of the door itself. The door has a working hatch which allows you to see outside of the door and can be shot through in both directions.", image: "../../../public/images/doors/door.hinged.toptier.png", price: 23000},
        {name: "High External Stone Gate", id: 3, description: "The High External Stone Gate is used with High External Stone Walls as a door for a player's compound.", image: "../../../public/images/doors/gates.external.high.stone.png", price: 29000},
        {name: "Garage Door", id: 4, description: "The garage door is a form of lockable door which slides upward from the bottom when opened. It fits within a wall frame, like the double door, but opens much slower than any other type of door. It is, however, more durable than the sheet metal double door - making it an effective loot room door.", image: "../../../public/images/doors/wall.frame.garagedoor.png", price: 33000},
        {name: "Prison Cell Gate", id: 5, description: "The prison cell gate is a door that fits into a wall frame. It is unique in that autoturrets and flame turrets can shoot through it. It opens by sliding to the side, leaving the other side accessible. It is worth noting that chests can be accessed through a cell gate, so it is not suited for loot rooms.", image: "../../../public/images/doors/wall.frame.cell.gate.png", price: 43000},
        {name: "Sheet Metal Double Door", id: 6, description: "It has the same health as a sheet metal door. It requires double the materials, but allows for more space within your base. Ideal for loot rooms and other cramped areas.", image: "../../../public/images/doors/door.double.hinged.metal.png", price: 33000},
        {name: "Wooden Door", id: 7, description: "The Wooden Door is an early game building item that is made from wood and cheap to produce. Being the cheapest of all the doors, it is often used alongside a Lock to quickly secure a base.", image: "../../../public/images/doors/door.hinged.wood.png", price: 1500},
        {name: "Armored Double Door", id: 8, description: "The armored double door is the highest tier double door and is the best for base defense. Because of its high durability, if the door is placed in a weak wall frame, raiders may target the wall frame instead of the door itself. The door has working hatches and these hatches allow you to see outside of the door and can be shot through in both directions.", image: "../../../public/images/doors/door.double.hinged.toptier.png", price: 27000},
        {name: "High External Wooden Gate", id: 9, description: "The High External Wooden Gate is a deployable building object used in conjunction with High External Wooden Walls to deny access to an area. The high external gate entrance is about the height and width of a standard 2x2 wall. While its total width is approximately 2.5 foundations wide.", image: "../../../public/images/doors/gates.external.high.wood.png", price: 3000},
    ]
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer