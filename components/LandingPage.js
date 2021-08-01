import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const LandingPage=()=>{

    let history = useHistory()

    useEffect(()=>{
        AOS.init({
            offset: 200,
            duration: 700,
            easing: 'ease-in-sine'
        });
    }, [])

    return(
        <div className='App'>
            <div className="banner1">
                <h1 className="text-banner1">คัดสรรมาเพื่อคุณ</h1>
                <p>มอบความอร่อยเเละคุณภาพที่ยอดเยี่ยมให้คุณมีความสุขไปกับทุกคำ</p>
                <button onClick={()=>{
                    window.location.href = "https://www.facebook.com/Shong-Cha-%E0%B8%8A%E0%B8%87%E0%B8%8A%E0%B8%B2-%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%94%E0%B8%AD%E0%B8%A2%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B8%AD-106290537805887/"
                }}>เข้าชม</button>
            </div>
            <div className="break-banner">
                <h1>เลือกอาหารของคุณด้วยเพียงเเค่การเเตะ</h1>
                <p>เราพร้อมให้คำตอบเเละเเก้ปัญหาให้คุณเต็มความสามารถตลอด 24 ชั่วโมง</p>
                <p>จอมทอง - แม่ขาน อ.ดอยหล่อ จ.เชียงใหม่ 50160</p>
            </div>
            <div className="grid-show">
                <div onClick={()=> history.push('/display_product')} className="show-thing">
                    <img src="https://image.flaticon.com/icons/png/512/2922/2922037.png"></img>
                    <h2>มีอาหารให้เลือก</h2>
                    <p>เลือกอาหารสิ่งที่ชอบเเละไม่ต้องยากลำบาก</p>
                </div>
                <div className="show-thing">
                    <img src="https://image.flaticon.com/icons/png/512/2230/2230606.png"></img>
                    <h2>เเลกเปลี่ยน</h2>
                    <p>เลือกอาหารสิ่งที่ชอบเเละไม่ต้องยากลำบาก</p>
                </div>
                <div className="show-thing">
                    <img src="https://image.flaticon.com/icons/png/512/679/679922.png"></img>
                    <h2>ส่งพัสดุ</h2>
                    <p>เลือกอาหารสิ่งที่ชอบเเละไม่ต้องยากลำบาก</p>
                </div>
            </div>
            <div className="footer">
                {/* <h1>Micro Delivery</h1> */}
            </div>
        </div>
    )
}

export default LandingPage