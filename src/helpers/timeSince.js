import moment  from "moment";
export function formatDuration(period) {
        const duration = moment.duration(period, 'milliseconds');
        // return nothing when the duration is falsy or not correctly parsed (P0D)
        if(!duration || duration.toISOString() === "P0D") return;
    
        if(duration.years() >= 1) {
            const years = Math.floor(duration.years());
            return (years+" "+(years > 1 ? "years ago" : "year ago"));
        }
    
        if(duration.months() >= 1) {
            const months = Math.floor(duration.months());
            return (months+" "+(months > 1 ? "months ago" : "month ago"));
        }
    
        if(duration.days() >= 1) {
            const days = Math.floor(duration.days());
            return (days+" "+(days > 1 ? "days ago" : "day ago"));
        }
    
        if(duration.hours() >= 1) {
            const hours = Math.floor(duration.hours());
            return (hours+" "+(hours > 1 ? "hours ago" : "hour ago"));
        }
    
        if(duration.minutes() >= 1) {
            const minutes = Math.floor(duration.minutes());
            return (minutes+" "+(minutes > 1 ? "minutes ago" : "minute ago"));
        }
    
        if(duration.seconds() >= 1) {
            const seconds = Math.floor(duration.seconds());
            return (seconds+" "+(seconds > 1 ? "seconds ago" : "second ago"));
        }
    
    }
