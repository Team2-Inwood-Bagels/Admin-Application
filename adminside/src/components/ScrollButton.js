import {Button} from "@material-ui/core";
import {useState} from "react";
import {ArrowUpward} from "@material-ui/icons";



function ScrollButton() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        const safariScrolled = document.body.scrollTop;

        if(scrolled > 20 || safariScrolled){
            setVisible(true)
        }else if(scrolled <= 20){
            setVisible(false)
        }
    };

    const toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);
    return(
        <Button
            className={"scrollUp"}
        >
            <ArrowUpward
                onClick={toTop}
                style={{display: visible ? 'block' : 'none'} }
            />
        </Button>
    )

}

export default ScrollButton