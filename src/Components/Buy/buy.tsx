import * as React from "react";
import "./buy.css";
import NavBar from "../General/navbar";
import Footer from "../General/footer";
import "../Landing/landing.css";
import prod1 from "../../assets/prod1.jpg";
import prod2 from "../../assets/prod2.jpg";
import prod4 from "../../assets/prod4.jpg";
import prod7 from "../../assets/prod7-bg.png";
import prod8 from "../../assets/prod8.jpg";
import prod9 from "../../assets/prod9-bg.png";
import prod10 from "../../assets/prod10-bg.png";
import prod11 from "../../assets/prod11.jpg";
import prod12 from "../../assets/prod12.jpg";
import { useHistory } from "react-router-dom";
import prod13 from "../../assets/prod13-bg.png";
import prod14 from "../../assets/prod14.jpg";
import prod15 from "../../assets/prod15.jpg";
import prod16 from "../../assets/prod16.jpg";
import prod17 from "../../assets/prod17.jpg";


//Smart Screens
// 3751RK Optoma Flat panel prod1
// 3861RK OPTOMA prod2
// 3861RK prod3
// 5751RK OPTOMA prod4
// 5751RK prod5
// OPTOMA FLAT PANEL prod6

// Projectors
// S334e prod7
// UHD35 prod8
// w400 prod9
// x309ste prod10
// ZH403 prod11
// ZH406ST prod12
// EH412 prod13
// EH416 prod14
// UHD30 prod15

//Interactive Whiteboards
// Interactive Whiteboard 82 prod16
// Interactive whiteboard 96 prod17

const Buy = () => {
  const [state, setState] = React.useState<any>({
    search: "",
    screens: [],
    projectors: [],
    boards: [],
    searchClick: false,
    nosearch: false,
  });
  const { search, screens, projectors, searchClick, nosearch, boards } = state;
  React.useEffect(() => {
    window.scrollTo(-0, -0);
    setState({
      ...state,
      screens: [
        {
          id: 0,
          name: "OPTOMA 3751RK",
          short_descrip:
            "Robust collaboration, extensive connectivity options and a value-focused design",
          descrip: [
            "Robust collaboration, extensive connectivity options and a value-focused design. With a combined technology and packed with everything a classroom or business requires, the Creative Touch 3 Series delivers all the functionalities and processing power needed to create, educate and collaborate.",
            "Easily access the front-facing ports for HDMI and USB connectivity. For wireless connectivity, Optoma’s TapCast Pro allows up to four users to share content at the same time from their Windows, iOS, MacOS, Chrome or Android device.",
            "The easy-to-use IFPDs also make lessons more fun with built-in collaboration tools such as Vote, where teachers are able to collect valuable feedback instantly.",
            "Equipped with an OPS slot, and easy to download OTA updates. The touchscreen display is future-proofed should your requirements change in the ever-changing world of technology (OPS sold separately).",
          ],
          image: prod1,
          keywords: [
            "optoma",
            "3751rk",
            "3751",
            "3751 rk",
            "smart screens",
            "screens",
            "3751rk optoma flat panel",
            "flat panel",
            "75",
            "interactive",
            "interactive flat display panel",
          ],
        },
        {
          id: 1,
          name: "OPTOMA 5751RK",
          short_descrip:
            "Optoma Creative Touch 5 Series premium interactive flat panel displays provide excellent collaboration and connectivity features for any classroom or business space",
          descrip: [
            "Optoma Creative Touch 5 Series premium interactive flat panel displays provide excellent collaboration and connectivity features for any classroom or business space. Premium wireless collaboration software tools are preinstalled to enable seamless interactivity from a variety of different devices.",
            "The included quick-draw pen instantly activates the whiteboard application, saving the time and energy spent on having to manually change modes. With a slim, narrow-bezel, high-end design the 5 Series will fit seamlessly into any environment. The screen features a 1mm air gap for natural touch functionality so you can write clearly and confidently with improved accuracy.",
            "Meeting room scheduling is simplified with the included Joan meeting widget and app, a collaborative calendar tool that seamlessly pairs with popular calendars to take the guesswork out of meeting room availability directly. Book meetings on the spot or through your existing desktop calendar and mobile phone.",
          ],
          image: prod4,
          keywords: [
            "optoma",
            "5751rk",
            "5751 rk",
            "5751",
            "smart screens",
            "screens",
            "5751rk optoma",
            "flat panel",
            "75",
            "interactive",
            "interactive flat display panel",
          ],
        },
        {
          id: 1,
          name: "OPTOMA 3861RK",
          short_descrip:
            "It exhibits robust collaboration, extensive connectivity options and a value-focused design.",
          descrip: [
            "It exhibits robust collaboration, extensive connectivity options and a value-focused design. Optoma Creative Touch 5 Series premium interactive flat panel displays provide excellent collaboration and connectivity features for any classroom or business space. Premium wireless collaboration software tools are preinstalled to enable seamless interactivity from a variety of different devices.",
            "The included quick-draw pen instantly activates the whiteboard application, saving the time and energy spent on having to manually change modes. With a slim, narrow-bezel, high-end design the 5 Series will fit seamlessly into any environment. The screen features a 1mm air gap for natural touch functionality so you can write clearly and confidently with improved accuracy.",
            "Meeting room scheduling is simplified with the included Joan meeting widget and app, a collaborative calendar tool that seamlessly pairs with popular calendars to take the guesswork out of meeting room availability directly. Book meetings on the spot or through your existing desktop calendar and mobile phone.",
          ],
          image: prod2,
          keywords: [
            "optoma",
            "3861rk",
            "3861 rk",
            "3861",
            "smart screens",
            "screens",
            "3861rk optoma",
            "flat panel",
            "86",
            "interactive",
            "interactive flat display panel",
          ],
        },
      ],
      projectors: [
        {
          id: 0,
          name: "OPTOMA S334e",
          short_descrip:
            "The S334e boasts amazing colour, long lamp life and energy-saving features to provide you with a low overall cost of ownership.",
          descrip: [
            "Project bright vibrant presentations effortlessly any time of day. Designed for meeting rooms and classrooms. The S334e boasts amazing colour, long lamp life and energy-saving features to provide you with a low overall cost of ownership.",
            "This projector is easy to connect to with multiple inputs, a built-in speaker and USB Power. Perfect for connecting HDMI dongles such as the Optoma HDCast Pro and the Google Chromecast or a laptop, PC or Blu-ray player for clear projected images with sound. It’s a Portable and lightweight projector can be installed or taken on the move for off-site meetings with the optional carry bag.",
          ],
          image: prod7,
          keywords: ["s334e", "projector", "334e", "s334", "s 334e"],
        },
        {
          id: 1,
          name: "OPTOMA X309STe",
          short_descrip:
            "Designed for small meeting rooms and classrooms, this short throw projector boasts amazing colour, a long lamp life and energy saving features for a lower overall cost of ownership.",
          descrip: [
            "Short throw, bright and compact projector - Designed for small meeting rooms and classrooms, this short throw projector boasts amazing colour, a long lamp life and energy saving features for a lower overall cost of ownership.",
            "Multiple inputs, USB power and a built-in speaker provide an easy set-up perfect for connecting to laptop, PC or Blu-ray player for clear projected images with sound. You can even connect a HDMI dongle for wireless presentations.",
          ],
          image: prod10,
          keywords: ["x309ste", "projector", "x 309ste", "x309", "x 309"],
        },
        {
          id: 2,
          name: "OPTOMA W400",
          short_descrip:
            "Transform the delivery of your presentation with the first ever 4,000 lumen, small, lightweight W400 projector.",
          descrip: [
            "Transform the delivery of your presentation with the first ever 4,000 lumen, small, lightweight W400 projector. This model is designed to be used at any time of day and for multiple purposes, including professional use (from business meetings to classrooms). It offers top quality projected colour, long lamp life with a low overall cost of ownership.",
            "This HD ready product boasts simplicity in design, with easy navigation and reliability. Convenient, with multiple inputs including HDMI and MHL. This projector is ideal for connecting HDMI dongles such as the Google Chromecast and the Optoma HDCast Pro enabling you to connect your laptop, PC or Blu-ray player. This compact can either be installed or conveniently taken on the move due to its Lightweight and portability.",
          ],
          image: prod9,
          keywords: ["w400", "projector", "w 400"],
        },
        {
          id: 3,
          name: "OPTOMA EH412",
          short_descrip: "High resolution, versatile and powerful projector",
          descrip: [
            "Lightweight and portable, perfect for classroom and meeting room presentations, this projector is designed to be used at any time of day. Additionally, it boasts easy connectivity with multiple inputs including HDMI, VGA and a built in 10W speaker.",
            "The Optoma EH412 has 1080P HD resolution and supports 4K HDR input sources, sRGB and REC.709 colour profiles. Adds 50,000:1 contrast ratio and users are guaranteed bright, sharp and vivid images.",
            "You can even use the USB Power to connect and power HDMI dongles such as the Google Chromecast.",
          ],
          image: prod13,
          keywords: ["eh412", "projector", "eh 412", "eh"],
        },
        {
          id: 4,
          name: "OPTOMA EH416",
          short_descrip: "Full HD 1080p, compact and powerful",
          descrip: [
            "Project high resolution visuals regardless of the ambient light level using the bright full HD 1080p EH416. Designed for businesses and professional installation environments this compact and powerful projector can be installed or taken on the move. Perfect for small edge blending and stacking projects.",
            "Easy to connect to with multiple inputs including two HDMI, MHL, VGA and a built in 10W speaker. You can even present wirelessly using the HDCast Pro (sold separately) or use the USB Power to connect and power HDMI dongles such as the Google Chromecast.",
            "For more complex installations, this projector is equipped with a large 1.6x zoom range, vertical lens shift and networking features for remote monitoring and control. For more complex installations, this projector is equipped with a large 1.6x zoom range, vertical lens shift and networking features for remote monitoring and control.",
          ],
          image: prod14,
          keywords: ["eh416", "projector", "eh 416", "eh"],
        },
        {
          id: 5,
          name: "OPTOMA UHD30",
          short_descrip: "4K UHD gaming and home entertainment projector",
          descrip: [
            "Immerse yourself in a world of Ultra HD gaming, live sports, TV shows and movies. The UHD30 delivers impressive 4K cinema quality images and lightning fast refresh rate of 240Hz for silky smooth gaming. Its Full 3D compatible. TV and movie fans can also enjoy excellent colour depth, crystal clear detail, and sparkling contrast for a stunningly immersive experience.",
            "Packed with the latest technology and features, this stylish projector boasts High Dynamic Range (HDR) and HLG compatibility, Full 3D and HDMI 2.0. Perfect for enjoying life-like big-screen entertainment in any living space.",
          ],
          image: prod15,
          keywords: ["uhd30", "projector", "uhd 30", "uhd"],
        },
        {
          id: 6,
          name: "OPTOMA UHD35",
          short_descrip:
            "Immerse yourself in a world of Ultra HD teaching and presentations with an excellent colour depth, crystal clear detail, and sparkling contrast projector.",
          descrip: [
            "Immerse yourself in a world of Ultra HD teaching and presentations with an excellent colour depth, crystal clear detail, and sparkling contrast projector. The lightning-fast, low latency 4K UHD UHD35 delivers impressive cinema-quality images, an ultra-low input lag of 4.2ms and a high refresh rate of 240Hz perfect for a competitive classroom/boardroom and Big screen entertainment.",
            "Packed with the latest technology and features, this stylish projector boasts High Dynamic Range (HDR) and HLG compatibility, Full 3D and two HDMI 2.0 ports.",
          ],
          image: prod8,
          keywords: ["uhd35", "projector", "uhd 35", "uhd"],
        },
        {
          id: 7,
          name: "OPTOMA ZH403",
          short_descrip:
            "Designed for maintenance free continuous operation, the ZH403 can be installed in virtually any orientation.",
          descrip: [
            "The ZH403 is a compact Full HD 1080p DuraCore laser projector. Designed for maintenance free continuous operation, it can be installed in virtually any orientation. Its small and lightweight footprint, 1.3x zoom combined with 360-degree and portrait projection make it a breeze to install.",
            "This feature packed projector is 4K and HDR compatible, has a built-in speaker and its laser technology delivers up to 30,000 hours maintenance-free laser light source. For ultimate control, the projector comes with RJ45 connection allowing you to monitor and control your network in multiple rooms. Geared for medium-sized exhibition venues, events and tradeshows or meeting rooms.",
            "It maintains excellent image quality as brightness and colour saturation is preserved for longer compared to lamp systems.",
          ],
          image: prod11,
          keywords: ["zh403", "projector", "zh 403", "zh"],
        },
        {
          id: 8,
          name: " OPTOMA ZH406ST",
          short_descrip:
            "The ZH406ST is a compact short throw Full HD 1080p DuraCore laser projector. Designed for maintenance-free, continuous operation. It can be installed in virtually any orientation.",
          descrip: [
            "The ZH406ST is a compact short throw Full HD 1080p DuraCore laser projector. Designed for maintenance-free, continuous operation. It can be installed in virtually any orientation. Pack full of features, this compact laser projector has built-in speakers, 4K and HDR compatible, and low maintenance with extremely long-life laser technology.",
            "For ultimate control, the projector comes with RJ45 connection allowing you to monitor and control your network in multiple rooms. It exhibits 30,000 hours maintenance-free laser light source. Perfect for business, education and museums where a clear bright image is required.",
          ],
          image: prod12,
          keywords: [
            "zh406st",
            "projector",
            "zh406",
            "zh 406",
            "zh 406st",
            "zh",
          ],
        },
      ],
      boards: [
        {
          id: 0,
          name: "SMAAT 82\" INTERACTIVE WHITE BOARD",
          short_descrip: "SMAAT 82 inch for enhanced learning interaction and collaborative experience",
          descrip: [
            "It exhibits an Infra-red Touch Screen technology, a 20 point multi-touch screen, a Windows operating system and a Teaching software.", "Its lightning Fast and swift response makes it ideal for classrooms and business presentation. It can be easily installed and integrated. With a gross weight of 25kg and an aluminium frame, performance is optimum."
          ],
          image: prod16,
          keywords: ["interactive white board", "interactive whiteboard", "interactive", "white board", "whiteboard", "82", "82 inch", "82'" ],
        },
        {
          id: 1,
          name: "SMAAT 96\" INTERACTIVE WHITE BOARD",
          short_descrip: "SMAAT 96 inch for enhanced learning interaction and collaborative experience",
          descrip: [
            "It exhibits an Infra-red Touch Screen technology, a 20 point multi-touch screen, a Windows operating system and a Teaching software.", "Its lightning Fast and swift response makes it ideal for classrooms and business presentation. It can be easily installed and integrated. With a gross weight of 25kg and an aluminium frame, performance is optimum."
          ],
          image: prod17,
          keywords: ["interactive white board", "interactive whiteboard", "interactive", "white board", "whiteboard", "96", "96 inch", "96'" ],
        },
        {
          id: 2,
          name: "SMAAT 102\" INTERACTIVE WHITE BOARD",
          short_descrip: "SMAAT 102 inch for enhanced learning interaction and collaborative experience",
          descrip: [
            "It exhibits an Infra-red Touch Screen technology, a 20 point multi-touch screen, a Windows operating system and a Teaching software.", "Its lightning Fast and swift response makes it ideal for classrooms and business presentation. It can be easily installed and integrated. With a gross weight of 25kg and an aluminium frame, performance is optimum."
          ],
          image: prod17,
          keywords: ["interactive white board", "interactive whiteboard", "interactive", "white board", "whiteboard", "102", "102 inch", "102'" ],
        },
      ],
    });
  }, []);
  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  let history = useHistory();
  const viewMore = (x: any) => {
    return history.push({
      pathname: `/buy/${x.name}`,
      state: {
        id: x.id,
        img: x.image,
        description: x.descrip,
      },
    });
  };
  console.log(screens);

  const searchProduct = () => {
    if (search) {
      let newscreen: any[] = [];
      let newprojectors: any[] = [];

      screens.map((item: any) => {
        if (item.keywords.includes(search.toLowerCase())) {
          console.log(item);
          newscreen.push(item);
          return;
        }
      });
      projectors.map((item: any) => {
        if (item.keywords.includes(search.toLowerCase())) {
          console.log(item);
          newprojectors.push(item);
          return;
        }
      });
      setState({
        ...state,
        screens: newscreen,
        projectors: newprojectors,
        searchClick: true,
        nosearch:
          newscreen.length === 0 && newprojectors.length === 0 ? true : false,
      });
      return;
    }
  };
  console.log(nosearch);
  const displayAll = () => {
    return setState({
      ...state,
      screens: [
        {
          id: 0,
          name: "OPTOMA 3751RK",
          short_descrip:
            "Robust collaboration, extensive connectivity options and a value-focused design",
          descrip: [
            "Robust collaboration, extensive connectivity options and a value-focused design. With a combined technology and packed with everything a classroom or business requires, the Creative Touch 3 Series delivers all the functionalities and processing power needed to create, educate and collaborate.",
            "Easily access the front-facing ports for HDMI and USB connectivity. For wireless connectivity, Optoma’s TapCast Pro allows up to four users to share content at the same time from their Windows, iOS, MacOS, Chrome or Android device.",
            "The easy-to-use IFPDs also make lessons more fun with built-in collaboration tools such as Vote, where teachers are able to collect valuable feedback instantly.",
            "Equipped with an OPS slot, and easy to download OTA updates. The touchscreen display is future-proofed should your requirements change in the ever-changing world of technology (OPS sold separately).",
          ],
          image: prod1,
          keywords: [
            "optoma",
            "3751rk",
            "3751",
            "3751 rk",
            "smart screens",
            "screens",
            "3751rk optoma flat panel",
            "flat panel",
            "75",
            "interactive",
            "interactive flat display panel",
          ],
        },
        {
          id: 1,
          name: "OPTOMA 5751RK",
          short_descrip:
            "Optoma Creative Touch 5 Series premium interactive flat panel displays provide excellent collaboration and connectivity features for any classroom or business space",
          descrip: [
            "Optoma Creative Touch 5 Series premium interactive flat panel displays provide excellent collaboration and connectivity features for any classroom or business space. Premium wireless collaboration software tools are preinstalled to enable seamless interactivity from a variety of different devices.",
            "The included quick-draw pen instantly activates the whiteboard application, saving the time and energy spent on having to manually change modes. With a slim, narrow-bezel, high-end design the 5 Series will fit seamlessly into any environment. The screen features a 1mm air gap for natural touch functionality so you can write clearly and confidently with improved accuracy.",
            "Meeting room scheduling is simplified with the included Joan meeting widget and app, a collaborative calendar tool that seamlessly pairs with popular calendars to take the guesswork out of meeting room availability directly. Book meetings on the spot or through your existing desktop calendar and mobile phone.",
          ],
          image: prod4,
          keywords: [
            "optoma",
            "5751rk",
            "5751 rk",
            "5751",
            "smart screens",
            "screens",
            "5751rk optoma",
            "flat panel",
            "75",
            "interactive",
            "interactive flat display panel",
          ],
        },
        {
          id: 1,
          name: "OPTOMA 3861RK",
          short_descrip:
            "It exhibits robust collaboration, extensive connectivity options and a value-focused design.",
          descrip: [
            "It exhibits robust collaboration, extensive connectivity options and a value-focused design. Optoma Creative Touch 5 Series premium interactive flat panel displays provide excellent collaboration and connectivity features for any classroom or business space. Premium wireless collaboration software tools are preinstalled to enable seamless interactivity from a variety of different devices.",
            "The included quick-draw pen instantly activates the whiteboard application, saving the time and energy spent on having to manually change modes. With a slim, narrow-bezel, high-end design the 5 Series will fit seamlessly into any environment. The screen features a 1mm air gap for natural touch functionality so you can write clearly and confidently with improved accuracy.",
            "Meeting room scheduling is simplified with the included Joan meeting widget and app, a collaborative calendar tool that seamlessly pairs with popular calendars to take the guesswork out of meeting room availability directly. Book meetings on the spot or through your existing desktop calendar and mobile phone.",
          ],
          image: prod2,
          keywords: [
            "optoma",
            "3861rk",
            "3861 rk",
            "3861",
            "smart screens",
            "screens",
            "3861rk optoma",
            "flat panel",
            "86",
            "interactive",
            "interactive flat display panel",
          ],
        },
      ],
      projectors: [
        {
          id: 0,
          name: "OPTOMA S334e",
          short_descrip:
            "The S334e boasts amazing colour, long lamp life and energy-saving features to provide you with a low overall cost of ownership.",
          descrip: [
            "Project bright vibrant presentations effortlessly any time of day. Designed for meeting rooms and classrooms. The S334e boasts amazing colour, long lamp life and energy-saving features to provide you with a low overall cost of ownership.",
            "This projector is easy to connect to with multiple inputs, a built-in speaker and USB Power. Perfect for connecting HDMI dongles such as the Optoma HDCast Pro and the Google Chromecast or a laptop, PC or Blu-ray player for clear projected images with sound. It’s a Portable and lightweight projector can be installed or taken on the move for off-site meetings with the optional carry bag.",
          ],
          image: prod7,
          keywords: ["s334e", "projector", "334e", "s334", "s 334e"],
        },
        {
          id: 1,
          name: "OPTOMA X309STe",
          short_descrip:
            "Designed for small meeting rooms and classrooms, this short throw projector boasts amazing colour, a long lamp life and energy saving features for a lower overall cost of ownership.",
          descrip: [
            "Short throw, bright and compact projector - Designed for small meeting rooms and classrooms, this short throw projector boasts amazing colour, a long lamp life and energy saving features for a lower overall cost of ownership.",
            "Multiple inputs, USB power and a built-in speaker provide an easy set-up perfect for connecting to laptop, PC or Blu-ray player for clear projected images with sound. You can even connect a HDMI dongle for wireless presentations.",
          ],
          image: prod10,
          keywords: ["x309ste", "projector", "x 309ste", "x309", "x 309"],
        },
        {
          id: 2,
          name: "OPTOMA W400",
          short_descrip:
            "Transform the delivery of your presentation with the first ever 4,000 lumen, small, lightweight W400 projector.",
          descrip: [
            "Transform the delivery of your presentation with the first ever 4,000 lumen, small, lightweight W400 projector. This model is designed to be used at any time of day and for multiple purposes, including professional use (from business meetings to classrooms). It offers top quality projected colour, long lamp life with a low overall cost of ownership.",
            "This HD ready product boasts simplicity in design, with easy navigation and reliability. Convenient, with multiple inputs including HDMI and MHL. This projector is ideal for connecting HDMI dongles such as the Google Chromecast and the Optoma HDCast Pro enabling you to connect your laptop, PC or Blu-ray player. This compact can either be installed or conveniently taken on the move due to its Lightweight and portability.",
          ],
          image: prod9,
          keywords: ["w400", "projector", "w 400"],
        },
        {
          id: 3,
          name: "OPTOMA EH412",
          short_descrip: "High resolution, versatile and powerful projector",
          descrip: [
            "Lightweight and portable, perfect for classroom and meeting room presentations, this projector is designed to be used at any time of day. Additionally, it boasts easy connectivity with multiple inputs including HDMI, VGA and a built in 10W speaker.",
            "The Optoma EH412 has 1080P HD resolution and supports 4K HDR input sources, sRGB and REC.709 colour profiles. Adds 50,000:1 contrast ratio and users are guaranteed bright, sharp and vivid images.",
            "You can even use the USB Power to connect and power HDMI dongles such as the Google Chromecast.",
          ],
          image: prod13,
          keywords: ["eh412", "projector", "eh 412", "eh"],
        },
        {
          id: 4,
          name: "OPTOMA EH416",
          short_descrip: "Full HD 1080p, compact and powerful",
          descrip: [
            "Project high resolution visuals regardless of the ambient light level using the bright full HD 1080p EH416. Designed for businesses and professional installation environments this compact and powerful projector can be installed or taken on the move. Perfect for small edge blending and stacking projects.",
            "Easy to connect to with multiple inputs including two HDMI, MHL, VGA and a built in 10W speaker. You can even present wirelessly using the HDCast Pro (sold separately) or use the USB Power to connect and power HDMI dongles such as the Google Chromecast.",
            "For more complex installations, this projector is equipped with a large 1.6x zoom range, vertical lens shift and networking features for remote monitoring and control. For more complex installations, this projector is equipped with a large 1.6x zoom range, vertical lens shift and networking features for remote monitoring and control.",
          ],
          image: prod14,
          keywords: ["eh416", "projector", "eh 416", "eh"],
        },
        {
          id: 5,
          name: "OPTOMA UHD30",
          short_descrip: "4K UHD gaming and home entertainment projector",
          descrip: [
            "Immerse yourself in a world of Ultra HD gaming, live sports, TV shows and movies. The UHD30 delivers impressive 4K cinema quality images and lightning fast refresh rate of 240Hz for silky smooth gaming. Its Full 3D compatible. TV and movie fans can also enjoy excellent colour depth, crystal clear detail, and sparkling contrast for a stunningly immersive experience.",
            "Packed with the latest technology and features, this stylish projector boasts High Dynamic Range (HDR) and HLG compatibility, Full 3D and HDMI 2.0. Perfect for enjoying life-like big-screen entertainment in any living space.",
          ],
          image: prod15,
          keywords: ["uhd30", "projector", "uhd 30", "uhd"],
        },
        {
          id: 6,
          name: "OPTOMA UHD35",
          short_descrip:
            "Immerse yourself in a world of Ultra HD teaching and presentations with an excellent colour depth, crystal clear detail, and sparkling contrast projector.",
          descrip: [
            "Immerse yourself in a world of Ultra HD teaching and presentations with an excellent colour depth, crystal clear detail, and sparkling contrast projector. The lightning-fast, low latency 4K UHD UHD35 delivers impressive cinema-quality images, an ultra-low input lag of 4.2ms and a high refresh rate of 240Hz perfect for a competitive classroom/boardroom and Big screen entertainment.",
            "Packed with the latest technology and features, this stylish projector boasts High Dynamic Range (HDR) and HLG compatibility, Full 3D and two HDMI 2.0 ports.",
          ],
          image: prod8,
          keywords: ["uhd35", "projector", "uhd 35", "uhd"],
        },
        {
          id: 7,
          name: "OPTOMA ZH403",
          short_descrip:
            "Designed for maintenance free continuous operation, the ZH403 can be installed in virtually any orientation.",
          descrip: [
            "The ZH403 is a compact Full HD 1080p DuraCore laser projector. Designed for maintenance free continuous operation, it can be installed in virtually any orientation. Its small and lightweight footprint, 1.3x zoom combined with 360-degree and portrait projection make it a breeze to install.",
            "This feature packed projector is 4K and HDR compatible, has a built-in speaker and its laser technology delivers up to 30,000 hours maintenance-free laser light source. For ultimate control, the projector comes with RJ45 connection allowing you to monitor and control your network in multiple rooms. Geared for medium-sized exhibition venues, events and tradeshows or meeting rooms.",
            "It maintains excellent image quality as brightness and colour saturation is preserved for longer compared to lamp systems.",
          ],
          image: prod11,
          keywords: ["zh403", "projector", "zh 403", "zh"],
        },
        {
          id: 8,
          name: " OPTOMA ZH406ST",
          short_descrip:
            "The ZH406ST is a compact short throw Full HD 1080p DuraCore laser projector. Designed for maintenance-free, continuous operation. It can be installed in virtually any orientation.",
          descrip: [
            "The ZH406ST is a compact short throw Full HD 1080p DuraCore laser projector. Designed for maintenance-free, continuous operation. It can be installed in virtually any orientation. Pack full of features, this compact laser projector has built-in speakers, 4K and HDR compatible, and low maintenance with extremely long-life laser technology.",
            "For ultimate control, the projector comes with RJ45 connection allowing you to monitor and control your network in multiple rooms. It exhibits 30,000 hours maintenance-free laser light source. Perfect for business, education and museums where a clear bright image is required.",
          ],
          image: prod12,
          keywords: [
            "zh406st",
            "projector",
            "zh406",
            "zh 406",
            "zh 406st",
            "zh",
          ],
        },
      ],
      boards: [
        {
          id: 0,
          name: "SMAAT 82\" INTERACTIVE WHITE BOARD",
          short_descrip: "SMAAT 82 inch for enhanced learning interaction and collaborative experience",
          descrip: [
            "It exhibits an Infra-red Touch Screen technology, a 20 point multi-touch screen, a Windows operating system and a Teaching software.", "Its lightning Fast and swift response makes it ideal for classrooms and business presentation. It can be easily installed and integrated. With a gross weight of 25kg and an aluminium frame, performance is optimum."
          ],
          image: prod16,
          keywords: ["interactive white board", "interactive whiteboard", "interactive", "white board", "whiteboard", "82", "82 inch", "82'" ],
        },
        {
          id: 1,
          name: "SMAAT 96\" INTERACTIVE WHITE BOARD",
          short_descrip: "SMAAT 96 inch for enhanced learning interaction and collaborative experience",
          descrip: [
            "It exhibits an Infra-red Touch Screen technology, a 20 point multi-touch screen, a Windows operating system and a Teaching software.", "Its lightning Fast and swift response makes it ideal for classrooms and business presentation. It can be easily installed and integrated. With a gross weight of 25kg and an aluminium frame, performance is optimum."
          ],
          image: prod17,
          keywords: ["interactive white board", "interactive whiteboard", "interactive", "white board", "whiteboard", "96", "96 inch", "96'" ],
        },
        {
          id: 2,
          name: "SMAAT 102\" INTERACTIVE WHITE BOARD",
          short_descrip: "SMAAT 102 inch for enhanced learning interaction and collaborative experience",
          descrip: [
            "It exhibits an Infra-red Touch Screen technology, a 20 point multi-touch screen, a Windows operating system and a Teaching software.", "Its lightning Fast and swift response makes it ideal for classrooms and business presentation. It can be easily installed and integrated. With a gross weight of 25kg and an aluminium frame, performance is optimum."
          ],
          image: prod17,
          keywords: ["interactive white board", "interactive whiteboard", "interactive", "white board", "whiteboard", "102", "102 inch", "102'" ],
        },
      ],
      search: "",
      searchClick: false,
      nosearch: false,
    });
  };
  return (
    <>
      <NavBar buy={true} />
      <main>
        <div className="p-buy-sec1 p-padd">
          <h5 className="p-buy-sec1-ttl">Our Products</h5>
          <div className="p-buy-sec1-inputsec">
            <input
              className="p-buy-search-input"
              type="search"
              name="search"
              placeholder="Search for products by Name or Type, eg: Projectors"
              value={search}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  return searchProduct();
                }
              }}
            />
            <button className="p-buy-search-btn" onClick={searchProduct}>
              Search
            </button>
            {searchClick && (
              <i
                onClick={displayAll}
                className="far fa-times-circle p-cancel-search"
              ></i>
            )}
          </div>
        </div>

        {/* Interactive Whiteboards */}
        {!nosearch && (<div className="p-buy-products p-marg">
          {projectors.length > 0 && (
            <h5 className="p-buy-sec1-ttl">Interactive White Boards</h5>
          )}
          <div className="p-buy-itemsec">
            {boards.map((x: any, i: any) => (
              <div className="p-buy-items" key={i}>
                <img className="p-buy-products-img" src={x.image} alt="" />
                <h6 className="p-buy-products-hd">{x.name}</h6>
                <p className="p-buy-products-descrip">{x.short_descrip}</p>
                <a className="p-buy-products-link" onClick={() => viewMore(x)}>
                  View More
                </a>
              </div>
            ))}
          </div>
        </div>)}

        {/* Smart screens */}
        {!nosearch && (<div className="p-buy-products p-marg">
          {screens.length > 0 && (
            <h5 className="p-buy-sec1-ttl">Interactive Flat Panels</h5>
          )}
          <div className="p-buy-itemsec">
            {screens.map((x: any, i: any) => (
              <div className="p-buy-items" key={i}>
                <img className="p-buy-products-img" src={x.image} alt="" />
                <h6 className="p-buy-products-hd">{x.name}</h6>
                <p className="p-buy-products-descrip">{x.short_descrip}</p>
                <a className="p-buy-products-link" onClick={() => viewMore(x)}>
                  View More
                </a>
              </div>
            ))}
          </div>
        </div>)}

        {/* Projectors */}
        {!nosearch && (<div className="p-buy-products p-marg">
          {projectors.length > 0 && (
            <h5 className="p-buy-sec1-ttl">Projectors</h5>
          )}
          <div className="p-buy-itemsec">
            {projectors.map((x: any, i: any) => (
              <div className="p-buy-items" key={i}>
                <img className="p-buy-products-img" src={x.image} alt="" />
                <h6 className="p-buy-products-hd">{x.name}</h6>
                <p className="p-buy-products-descrip">{x.short_descrip}</p>
                <a className="p-buy-products-link" onClick={() => viewMore(x)}>
                  View More
                </a>
              </div>
            ))}
          </div>
        </div>)}

        {nosearch && (
          <h2 className="p-nosearch">No items match your search :(</h2>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Buy;
