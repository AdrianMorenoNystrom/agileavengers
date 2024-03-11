import React from 'react';
import { Link } from 'react-router-dom';
import './menu.scss';
import { menuData } from '../../menuData';
import { LayoutDashboard } from 'lucide-react'; 
import { NotepadText } from 'lucide-react';
import { Users } from 'lucide-react';
import { CalendarCheck } from 'lucide-react';


const Menu = () => {
  return (
    <div className="menu">
      {menuData.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              {listItem.title === "Dashboard" && <LayoutDashboard size={20}/>}
              {listItem.title === "Projects" && <NotepadText size={20}/>}
              {listItem.title === "Users" && <Users size={20}/>}
              {listItem.title === "Report time" && <CalendarCheck size={20}/>}
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
