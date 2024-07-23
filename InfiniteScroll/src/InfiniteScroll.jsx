import React, { useEffect, useState } from 'react'
import './index.css'
const STATE = {
    LOADING: 'LOADING',
    ERROR: "ERROR",
    SUCCESS: 'SUCCESS'

}
function InfiniteScroll() {
    const [data, setData] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [status, setStatus] = useState(STATE.LOADING)
    useEffect(() => {
        setStatus(STATE.LOADING);
        const getData = async () => {
            try {
                const response = await fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=9`)
                const result = await response.json()
                setStatus(STATE.SUCCESS)
                setData(prevData => [...prevData, ...result])

            }
            catch (err) {
                setStatus(STATE.ERROR)
            }
        }
        getData()

    }, [pageNo])
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                observer.unobserve(lastImage)
                setPageNo(prevPageNo => prevPageNo + 1)


            }
        }, { threshold: 0.5 })
        const lastImage = document.querySelector('.image-post:last-child')
        if (!lastImage) {
            return
        }
        observer.observe(lastImage)
        return () => {
            if (lastImage) {
                observer.unobserve(lastImage);
            }
            observer.disconnect()
        }

    }, [data])
    return (
        <>
            <div className="container">
                {data.map((item) => (
                    <img className='image-post' key={item.id} src={item.download_url} alt="" />
                ))}
                {status === STATE.LOADING && <div className='loader'></div>}
                {status === STATE.ERROR && <div>⚠️ERROR⚠️</div>}
            </div>
        </>
    )
}

export default InfiniteScroll