import React from 'react';
import { Sticker } from 'lucide-react';
import "./widgetplaceholder.scss";

// Used to check if the display data is global or project specific.
// Adds a tag accordingly.

function WidgetPlaceholder() {
    
    return (
        <div className='widgetPlaceholder'>
            <h4>Add custom widget</h4>
            <Sticker strokeWidth={0.5} color={"#b0b0b0"} size={80}/>
        </div>
    );
}

export default WidgetPlaceholder;
