import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" style={{backgroundColor:"#E1E1E1"}}>
      <Tab icon={<AltRouteIcon fontSize="small" />} label="Routing" />
      <Tab icon={<FeaturedPlayListIcon fontSize="small"/>} label="Order List" />
    </Tabs>
  );
}
