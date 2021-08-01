import axios from "axios"
import { useDispatch } from "react-redux"
import Swal from 'sweetalert2'
import { ResetCart } from "../actions/CartActions"

let OmiseCard

const CheckoutCreaditCard = ({ total, user, cart, HandleOrder }) => {

    let dispatch = useDispatch()

    let handleLoadScript = () => { // Load script
        OmiseCard = window.OmiseCard
        OmiseCard.configure({
            publicKey: "pkey_test_5onhu6tsiwtl37ofp6n",
            currency: 'thb',
            frameLabel: 'Micro Shop',
            submitLabel: 'จ่ายเงิน',
            buttonLabel: 'จ่ายเงินกับ Micro Shop'
        })
    }

    handleLoadScript() // โหลด script

    let creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: 'credit_card', // รับเป็น อะไร
            otherPaymentMethods: [] // ใส่เป็น array ไว้ไม่งั้นมันจะรับ card อื่นมาด้วย
        });
        OmiseCard.configureButton('#credit-card') // เชื่อม button
        OmiseCard.attach() // เชื่อม
    }

    let omiseCartHandler = () => { //// เป็น function จ่ายเงิน ที่รอรับ token จากฝั่ง omise server 
        OmiseCard.open({
            amount: total * 100, // 1 หมื่น สตางค์ 100 บาท unit สตางค์
            submitFormTarget: '#checkout-form',
            onCreateTokenSuccess: (nonce) => {
                axios.post("http://play2lover.ddns.net:3001/checkout-credit-card", {
                    token: nonce,
                    user: user,
                    total: total * 100
                }).then((res) => {
                    if (res.data.charge.status === "successful") {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'ทำธุรกรรมเสร็จเรียบร้อย',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        dispatch(ResetCart())
                    }
                })
                /* Handler on token or source creation.  Use this to submit form or send ajax request to server */
            },
            onFormClosed: () => {
                /* Handler on form closure. */
            },
        })
    }

    let HandleSubmit = (e) => { // เป็น function ที่เรียกใช้งาน
        e.preventDefault()

        creditCardConfigure()
        omiseCartHandler()
        HandleOrder(user, cart)
    }

    return (
        <div className='check'>
            <form>
                <button onClick={HandleSubmit} id="credit-card">จ่ายด้วยบัตรเครดิต</button>
            </form>
        </div>
    )
}

export default CheckoutCreaditCard