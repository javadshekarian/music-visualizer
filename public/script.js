const btn=document.querySelector("button")
const visualizer=document.querySelector("canvas")

btn.addEventListener("click",()=>{
    document.querySelector("audio").play()
    const audio=new Audio()
    audio.src="music.mp3"

    const audioContext=new AudioContext()
    const analyser=audioContext.createAnalyser()
    const mediaStreamSource=audioContext.createMediaElementSource(audio)

    mediaStreamSource.connect(analyser)
    analyser.fftSize=256
    audio.play()
    drawVisualizer()

    function drawVisualizer(){
        requestAnimationFrame(drawVisualizer)
        const bufferLength=analyser.frequencyBinCount;
        const dataArray=new Uint8Array(bufferLength)

        analyser.getByteFrequencyData(dataArray)
        const width=visualizer.width
        const height=visualizer.height
        const barWidth=10
        const canvasContext=visualizer.getContext("2d")
        canvasContext.clearRect(0,0,width,height)
        let x=0

        dataArray.forEach((item,index,array)=>{
            const y=item/255*height*1.1
            canvasContext.strokeStyle="rgb(0,220,225)"
            x=x+barWidth
            canvasContext.beginPath()
            canvasContext.lineCap="round"
            canvasContext.lineWidth=2
            canvasContext.moveTo(x,height)
            canvasContext.lineTo(x,height-y)
            canvasContext.stroke()
        })
    }
})