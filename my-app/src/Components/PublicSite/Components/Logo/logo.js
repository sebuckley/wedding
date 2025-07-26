// import './logo.css'; 
import React from 'react';


export default function Logo(props){

    let height = props.height;
    let width = props.width;
    let fontSize = props.fontSize;
    let textFont = props.textFont;
    let color = props.color;
    let postitionFromMargin  = props.postitionFromMargin;
    let andFont = props.andFont;
    let andFontSize = props.andFontSize;
    let andColor = props.andColor;
    let andShadow = props.andShadow;
    let andShadowOpacity = props.andShadowOpacity;
    let shadowColor = props.shadowColor;
    let shadowOpacity = props.shadowOpacity;
    let textShadow = props.textShadow;

    const colorKeywordToRGB = (colorKeyword) => {

        // CREATE TEMPORARY ELEMENT
        let el = document.createElement('div');

        // APPLY COLOR TO TEMPORARY ELEMENT
        el.style.color = colorKeyword;

        // APPEND TEMPORARY ELEMENT
        document.body.appendChild(el);

        // RESOLVE COLOR AS RGB() VALUE
        let rgbValue = window.getComputedStyle(el).color;
        
        // REMOVE TEMPORARY ELEMENT
        document.body.removeChild(el);

        return rgbValue;

    }

    const addOpacityToRGB = (rgb, opacity) => {

        // Ensure the opacity is between 0 and 1
        if (opacity < 0 || opacity > 1) {
            throw new Error("Opacity must be a value between 0 and 1.");
        }

        // Extract the RGB values using a regular expression
        const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!match) {
            throw new Error("Invalid RGB format. Use 'rgb(r, g, b)'.");
        }

        const [_, r, g, b] = match;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;

    }

    if(typeof width === "undefined"){

        width = "150px";

    }

    if(typeof height === "undefined"){

        height = "60px";

    }

    if(typeof fontSize === "undefined"){

        fontSize = "16px";

    }

    if(typeof textFont === "undefined"){

        textFont = "var(--text-font-logo-1)";

    }

    if(typeof color === "undefined"){

        color = "var(--text-color-logo-1)";

    }

    if(typeof postitionFromMargin === "undefined"){

        postitionFromMargin = "5%";

    }

    if(typeof andFont === "undefined"){

        andFont = "var(--and-font-logo-1)";

    }

    if(typeof andFontSize === "undefined"){

        andFontSize = "50px";

    }

    if(typeof andColor === "undefined"){

        andColor = "var(--and-color-logo-1)";

    }

    if(typeof andShadowOpacity === "undefined"){

        andShadowOpacity = 0.5;

    }

    if(typeof shadowColor === "undefined"){

        shadowColor = "var(--text-shadow-logo-1)";

    }

    if(typeof shadowOpacity === "undefined"){

        shadowOpacity = 0.8;

    }

    if(typeof andShadow === "undefined"){

        let a = colorKeywordToRGB(shadowColor);
        a = addOpacityToRGB(a, andShadowOpacity);

        andShadow = "1px 1px 1px " + a;

    }else{

        let distance = "1px 1px 1px 1px";

        if(textShadow.includes(3)){

            distance = textShadow[0] + "px " + textShadow[1] + "px " + textShadow[2] + "px " + textShadow[3] + "px "

        }

        let b = colorKeywordToRGB(shadowColor);
        shadowColor = addOpacityToRGB(b, shadowOpacity);

        andShadow = distance + " " + b;

    }

    if(typeof textShadow === "undefined"){

        let c = colorKeywordToRGB(shadowColor);
        c = addOpacityToRGB(c, shadowOpacity);

        textShadow = "1px 1px 1px " + c;

    }else{

        let distance = "1px 1px 1px 1px";

        if(textShadow.includes(3)){

            distance = textShadow[0] + "px " + textShadow[1] + "px " + textShadow[2] + "px " + textShadow[3] + "px "

        }

        let d = colorKeywordToRGB(shadowColor);
        d = addOpacityToRGB(d, shadowOpacity);

        textShadow = "'" + distance + " " + d + "'";

    }

    const andStyle = {

        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
        "fontFamily": andFont,
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": andFontSize,
        "color": andColor,
        "zIndex": "1",
        "opacity": "0.6",
        "textShadow": andShadow

    }

    const logoCanvasStyle = {

        "position": "relative",
        "height": height,
        "width": width

    }

    const fNameStyle = {

        "position": "absolute",
        "top": postitionFromMargin,
        "left": "50%",
        "transform": "translate(-65%, 0%)",
        "fontFamily": textFont,
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": fontSize,
        "zIndex": "2",
        "color": color,
        "textShadow": textShadow

    }

    const sNameStyle = {

        "position": "absolute",
        "bottom": postitionFromMargin,
        "left": "50%",
        "transform": "translate(-35%, 0%)",
        "fontFamily": textFont,
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": fontSize,
        "zIndex": "2",
        "color": color,
        "textShadow": textShadow

    }

    return(

        <div style={logoCanvasStyle}>
    
            <div style={fNameStyle}> { props.fName } </div>

            <div style={andStyle}> & </div>

            <div style={sNameStyle}> { props.sName } </div>

        </div>

    )

}



