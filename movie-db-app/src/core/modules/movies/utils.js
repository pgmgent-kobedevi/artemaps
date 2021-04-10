const formatMinutesToString = (duration) => {

    let hours = Math.floor(duration / 60);
    const minutes = Math.ceil(duration % 60);
    return `${(hours)}h ${padTime(minutes)}m`;
}

const padTime = (time) =>{
    if(time < 10) {
        return `0${time}`;
    }
    return time
}

export default formatMinutesToString;