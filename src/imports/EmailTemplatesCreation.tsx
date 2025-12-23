import svgPaths from "./svg-gbedp7xz7o";

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[448.23px] text-[#1e2939] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Email Vorlagen - Katrin Sweets</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[896px]" data-name="Heading 2">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">1. Anfrage Bestätigung</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[303.79px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">Anfrage Bestätigung</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] opacity-90 relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[304.41px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">Vielen Dank für Ihre Bestellung!</p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-gradient-to-b from-[#e60076] h-[120px] relative shrink-0 to-[#f6339a] w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[120px] items-start pb-0 pt-[32px] px-[32px] relative w-full">
          <Heading3 />
          <Paragraph />
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[24px] left-[32px] top-[32px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Liebe/r Kunde/in,</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[228.26px] top-[1.33px] w-[94.5px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e60076] text-[16px] text-nowrap whitespace-pre">Katrin Sweets</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[48px] left-[32px] top-[80px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">vielen Dank für Ihre Anfrage bei</p>
      <Text />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] top-[-1.67px] w-[595px]">! Wir haben Ihre Bestellung erfolgreich erhalten und werden diese nun sorgfältig prüfen.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_25_688)" id="Icon">
          <path d={svgPaths.p39a39680} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_25_688">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-blue-100 relative rounded-[2.23696e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="basis-0 grow h-[78px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[78px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#1c398e] text-[16px] top-[-2px] w-[501px]">Wir werden Ihre Anfrage innerhalb von 24 Stunden prüfen und Ihnen ein individuelles Angebot zusenden. Die Bestellung wird erst nach Ihrer Bestätigung verbindlich.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] h-[78px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Paragraph3 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#eff6ff] h-[130px] items-start left-[32px] pb-[2px] pt-[26px] px-[26px] rounded-[16px] to-[#dbeafe] top-[152px] w-[608px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#1e2939] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Ihre Bestelldetails:</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[113.552px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[113.552px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Bestellnummer:</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[109.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[109.031px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">#KS-2024-0123</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[52.979px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[52.979px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Datum:</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[127.667px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[127.667px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">3. Dezember 2024</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[28px] relative shrink-0 w-[48.26px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[48.26px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Status:</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="bg-[#fef9c2] h-[28px] relative rounded-[2.23696e+07px] shrink-0 w-[93.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-center px-[10px] py-[2px] relative w-[93.813px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#894b00] text-[16px] text-nowrap whitespace-pre">In Prüfung</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[28px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[92px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex flex-col gap-[16px] h-[180px] items-start left-[32px] pb-0 pt-[24px] px-[24px] rounded-[10px] top-[306px] w-[608px]" data-name="Container">
      <Heading2 />
      <Container7 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[48px] left-[32px] top-[510px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] top-[-1.67px] w-[575px]">Sie können den aktuellen Status Ihrer Anfrage jederzeit über den untenstehenden Button einsehen.</p>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute bg-gradient-to-b from-[#e60076] h-[56px] left-[241.89px] rounded-[2.23696e+07px] to-[#f6339a] top-[590px] w-[188.219px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[94px] text-[16px] text-center text-nowrap text-white top-[14.33px] translate-x-[-50%] whitespace-pre">Status ansehen →</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Bei Fragen stehen wir Ihnen gerne zur Verfügung!</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="font-['Arimo:Regular',sans-serif] font-normal h-[48px] leading-[24px] relative shrink-0 text-[#4a5565] text-[16px] text-nowrap w-full whitespace-pre" data-name="Paragraph">
      <p className="absolute left-0 top-[-1.67px]">Mit süßen Grüßen,</p>
      <p className="absolute left-0 top-[22.33px]">Ihr Team von Katrin Sweets</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[112.667px] items-start left-[32px] pb-0 pt-[24.667px] px-0 top-[678px] w-[608px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[822.667px] relative shrink-0 w-full" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
      <Container3 />
      <Container8 />
      <Paragraph4 />
      <Link />
      <Container9 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[61.8px] top-[1.33px] w-[94.5px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e60076] text-[16px] text-center text-nowrap whitespace-pre">Katrin Sweets</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[24px] w-[624px]" data-name="Paragraph">
      <Text7 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[359.3px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">- Handgemachte Torten und Cookies mit Liebe gebacken</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[56px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.1px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Email: info@katrinsweets.de</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[84px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.25px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Tel: +49 123 456789</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[112px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.07px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Mo-Fr: 9:00 - 18:00 Uhr</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[152px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.41px] text-[#6a7282] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Made with ❤️ for sweet lovers</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-gray-100 h-[200px] relative shrink-0 w-full" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
      <Paragraph9 />
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function AnfrageBestatigung() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[1142.67px] items-start left-[112px] overflow-clip rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[40px] w-[672px]" data-name="AnfrageBestatigung">
      <Container />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[1182.67px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <AnfrageBestatigung />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[896px]" data-name="Heading 2">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">2. Anfrage Angenommen</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[40px] left-[311.28px] top-[32px] w-[49.438px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[40px] left-[25px] text-[36px] text-center text-nowrap text-white top-[-3px] translate-x-[-50%] whitespace-pre">🎉</p>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[24px] left-[32px] top-[88px] w-[608px]" data-name="Heading 1">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[304.3px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">Anfrage Angenommen!</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[24px] left-[32px] opacity-90 top-[120px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[304.18px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">Ihre Traumtorte wird Wirklichkeit</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-gradient-to-b from-[#e60076] h-[176px] relative shrink-0 to-[#f6339a] w-full" data-name="Container">
      <Text8 />
      <Heading5 />
      <Paragraph12 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[24px] left-[32px] top-[32px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Liebe/r Kunde/in,</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[21.66px] top-[25.33px] w-[98.875px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e60076] text-[16px] text-nowrap whitespace-pre">Katrin Sweets</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[48px] left-[32px] top-[80px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] top-[-1.67px] w-[600px]">großartige Neuigkeiten! Wir freuen uns, Ihnen mitteilen zu können, dass Ihre Anfrage bei</p>
      <Text9 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[120.53px] text-[#364153] text-[16px] text-nowrap top-[22.33px] whitespace-pre">angenommen wurde! 🎊</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pb8f0300} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-green-100 relative rounded-[2.23696e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="basis-0 grow h-[78px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[78px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#1c398e] text-[16px] top-[-2px] w-[480px]">Ihre Bestellung wurde bestätigt und wird bereits liebevoll für Sie vorbereitet. Wir können es kaum erwarten, Ihre individuelle Kreation zum Leben zu erwecken!</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[16px] h-[78px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Paragraph15 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#eff6ff] h-[130px] items-start left-[32px] pb-[2px] pt-[26px] px-[26px] rounded-[16px] to-[#dbeafe] top-[152px] w-[608px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container15 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#1e2939] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Bestellübersicht:</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[113.552px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[113.552px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Bestellnummer:</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[109.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[109.031px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">#KS-2024-0123</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[61.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[61.594px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Produkt:</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[24px] relative shrink-0 w-[163.177px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[163.177px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Individuelle Traumtorte</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[91.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[91.438px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Lieferdatum:</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[136.292px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[136.292px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">15. Dezember 2024</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text14 />
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[28px] relative shrink-0 w-[48.26px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[48.26px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Status:</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="bg-green-100 h-[28px] relative rounded-[2.23696e+07px] shrink-0 w-[98.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-center px-[10px] py-[2px] relative w-[98.406px]">
        <p className="font-['Arimo:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#016630] text-[16px] text-nowrap whitespace-pre">✓ Bestätigt</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[28px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[93.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[93.719px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Gesamtpreis:</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[46.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[46.594px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#e60076] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">€89,90</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="box-border content-stretch flex h-[36.667px] items-start justify-between pb-0 pt-[12.667px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Text18 />
      <Text19 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[184.667px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex flex-col gap-[16px] h-[272.667px] items-start left-[32px] pb-0 pt-[24px] px-[24px] rounded-[10px] top-[306px] w-[608px]" data-name="Container">
      <Heading6 />
      <Container22 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#1e2939] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Nächste Schritte:</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute h-[24px] left-0 top-[4px] w-[11.99px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#e60076] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">✓</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[24px] left-[19.99px] top-0 w-[220.031px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Ihre Bestellung wurde bestätigt</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="List Item">
      <Text20 />
      <Text21 />
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[24px] left-0 top-[4px] w-[13.813px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#e60076] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">→</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute h-[24px] left-[21.81px] top-0 w-[347.99px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Wir beginnen mit der Vorbereitung Ihrer Kreation</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="List Item">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute h-[24px] left-0 top-[4px] w-[13.781px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">○</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[24px] left-[21.78px] top-0 w-[341.573px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Sie erhalten eine Benachrichtigung zur Lieferung</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="List Item">
      <Text24 />
      <Text25 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[100px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-pink-50 box-border content-stretch flex flex-col gap-[8px] h-[164px] items-start left-[32px] pb-0 pl-[20px] pr-[16px] pt-[16px] top-[602.67px] w-[608px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e60076] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none" />
      <Heading7 />
      <List />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[48px] left-[32px] top-[790.67px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] top-[-1.67px] w-[535px]">Sie können den Fortschritt Ihrer Bestellung jederzeit über den Status-Button verfolgen.</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute bg-gradient-to-b from-[#e60076] h-[56px] left-[241.89px] rounded-[2.23696e+07px] to-[#f6339a] top-[870.67px] w-[188.219px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[94px] text-[16px] text-center text-nowrap text-white top-[14.33px] translate-x-[-50%] whitespace-pre">Status ansehen →</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] top-[-1.67px] w-[586px]">Vielen Dank für Ihr Vertrauen! Wir freuen uns darauf, Sie mit unserem Kunstwerk zu begeistern.</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="font-['Arimo:Regular',sans-serif] font-normal h-[48px] leading-[24px] relative shrink-0 text-[#4a5565] text-[16px] text-nowrap w-full whitespace-pre" data-name="Paragraph">
      <p className="absolute left-0 top-[-1.67px]">Mit süßen Grüßen,</p>
      <p className="absolute left-0 top-[22.33px]">Ihr Team von Katrin Sweets 🍰</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[136.667px] items-start left-[32px] pb-0 pt-[24.667px] px-0 top-[958.67px] w-[608px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[1127.33px] relative shrink-0 w-full" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
      <Container16 />
      <Container23 />
      <Container24 />
      <Paragraph16 />
      <Link1 />
      <Container25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[61.8px] top-[1.33px] w-[94.5px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e60076] text-[16px] text-center text-nowrap whitespace-pre">Katrin Sweets</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[24px] w-[624px]" data-name="Paragraph">
      <Text26 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[359.3px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">- Handgemachte Torten und Cookies mit Liebe gebacken</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[56px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.1px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Email: info@katrinsweets.de</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[84px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.25px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Tel: +49 123 456789</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[112px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.07px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Mo-Fr: 9:00 - 18:00 Uhr</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[152px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.41px] text-[#6a7282] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Made with ❤️ for sweet lovers</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-gray-100 h-[200px] relative shrink-0 w-full" data-name="Container">
      <Paragraph19 />
      <Paragraph20 />
      <Paragraph21 />
      <Paragraph22 />
      <Paragraph23 />
    </div>
  );
}

function AnfrageAngenommen() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[1503.33px] items-start left-[112px] overflow-clip rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[40px] w-[672px]" data-name="AnfrageAngenommen">
      <Container13 />
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[1543.33px] relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <AnfrageAngenommen />
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[896px]" data-name="Heading 2">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">3. Newsletter</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] h-[40px] left-[211.19px] rounded-[2.23696e+07px] top-[32px] w-[249.625px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[125.5px] text-[16px] text-center text-nowrap text-white top-[6.33px] translate-x-[-50%] whitespace-pre">✨ Newsletter Dezember 2024</p>
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[24px] left-[32px] top-[88px] w-[608px]" data-name="Heading 1">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[304.25px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">Neue süße Kreationen!</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[24px] left-[32px] opacity-90 top-[120px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[303.55px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">{`Entdecken Sie unsere neuesten Torten & Cookies`}</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-gradient-to-b from-[#e60076] h-[176px] relative shrink-0 to-[#f6339a] w-full" data-name="Container">
      <Text27 />
      <Heading9 />
      <Paragraph24 />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[24px] left-[32px] top-[32px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Liebe Naschkatzen,</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[72px] left-[32px] top-[80px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] top-[-1.67px] w-[540px]">die Weihnachtszeit steht vor der Tür und wir haben wieder wunderbare neue Kreationen für Sie vorbereitet! Lassen Sie sich von unseren neuesten süßen Kunstwerken verzaubern.</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-0 top-0 w-[32.958px]" data-name="Text">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[#1e2939] text-[24px]">🎂</p>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 2">
      <Text28 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[40.96px] text-[#1e2939] text-[16px] text-nowrap top-[2.33px] whitespace-pre">Neue Torten</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[60px] relative shrink-0 w-[82.385px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[60px] relative w-[82.385px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[60px] left-0 text-[60px] text-neutral-950 text-nowrap top-[-6px] whitespace-pre">🎂</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[192px] relative shrink-0 w-[202.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[192px] items-center justify-center relative w-[202.219px]">
        <Text29 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#1e2939] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Winterzauber Torte</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-1.67px] w-[354px]">Eine zauberhafte Schokoladen-Torte mit weißer Ganache, verziert mit essbaren Schneeflocken und winterlichen Beeren.</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[24px] relative shrink-0 w-[70.708px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[70.708px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#e60076] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Ab €65,00</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[119.042px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[119.042px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#e60076] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Mehr erfahren →</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[24px] items-center justify-between relative w-full">
          <Text30 />
          <Link2 />
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[192px] relative shrink-0 w-[404.438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[192px] items-start pb-0 pt-[24px] px-[24px] relative w-[404.438px]">
        <Heading11 />
        <Paragraph27 />
        <Container31 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex h-[192px] items-start relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[193.333px] left-0 rounded-[10px] top-0 w-[608px]" data-name="Container">
      <div className="box-border content-stretch flex flex-col h-[193.333px] items-start overflow-clip p-[0.667px] relative rounded-[inherit] w-[608px]">
        <Container33 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[60px] relative shrink-0 w-[82.385px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[60px] relative w-[82.385px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[60px] left-0 text-[60px] text-neutral-950 text-nowrap top-[-6px] whitespace-pre">🍰</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[192px] relative shrink-0 w-[202.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[192px] items-center justify-center relative w-[202.219px]">
        <Text31 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#1e2939] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Red Velvet Deluxe</p>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-1.67px] w-[332px]">Unser klassischer Red Velvet Cake mit Cream-Cheese-Frosting und einer eleganten goldenen Verzierung.</p>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[24px] relative shrink-0 w-[70.708px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[70.708px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#e60076] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Ab €59,90</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[119.042px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[119.042px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#e60076] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Mehr erfahren →</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[24px] items-center justify-between relative w-full">
          <Text32 />
          <Link3 />
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[192px] relative shrink-0 w-[404.438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[192px] items-start pb-0 pt-[24px] px-[24px] relative w-[404.438px]">
        <Heading12 />
        <Paragraph28 />
        <Container36 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex h-[192px] items-start relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container37 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute h-[193.333px] left-0 rounded-[10px] top-[217.33px] w-[608px]" data-name="Container">
      <div className="box-border content-stretch flex flex-col h-[193.333px] items-start overflow-clip p-[0.667px] relative rounded-[inherit] w-[608px]">
        <Container38 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[410.667px] relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container39 />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[466.667px] items-start left-[32px] top-[184px] w-[608px]" data-name="Container">
      <Heading10 />
      <Container40 />
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-0 top-0 w-[32.958px]" data-name="Text">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[#1e2939] text-[24px]">🍪</p>
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 2">
      <Text33 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[40.96px] text-[#1e2939] text-[16px] text-nowrap top-[2.33px] whitespace-pre">Neue Cookie-Kollektionen</p>
    </div>
  );
}

function Text34() {
  return (
    <div className="content-stretch flex h-[64px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[48px] min-h-px min-w-px relative shrink-0 text-[48px] text-center text-neutral-950">🍪</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[97.333px] items-start left-[16.67px] pb-0 pl-[98.375px] pr-[98.385px] pt-[16px] rounded-[10px] top-[16.67px] w-[262.667px]" data-name="Container">
      <Text34 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="absolute h-[24px] left-[16.67px] top-[126px] w-[262.667px]" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[131.73px] text-[#1e2939] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Lebkuchen Cookies</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[48px] left-[16.67px] top-[158px] w-[262.667px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[131.72px] text-[#4a5565] text-[16px] text-center top-[-1.67px] translate-x-[-50%] w-[195px]">Traditionelle Lebkuchen mit modernem Twist</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[87.48px] top-[219.33px] w-[121.031px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e60076] text-[16px] text-center text-nowrap whitespace-pre">€18,50 / 12 Stück</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="[grid-area:1_/_1] h-[258.667px] justify-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container42 />
      <Heading14 />
      <Paragraph29 />
      <Text35 />
    </div>
  );
}

function Text36() {
  return (
    <div className="content-stretch flex h-[64px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[48px] min-h-px min-w-px relative shrink-0 text-[48px] text-center text-neutral-950">❄️</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[97.333px] items-start left-[16.67px] pb-0 pl-[98.375px] pr-[98.385px] pt-[16px] rounded-[10px] top-[16.67px] w-[262.667px]" data-name="Container">
      <Text36 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="absolute h-[24px] left-[16.67px] top-[126px] w-[262.667px]" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[131.31px] text-[#1e2939] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Schneeflocken Box</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[48px] left-[16.67px] top-[158px] w-[262.667px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[131.41px] text-[#4a5565] text-[16px] text-center top-[-1.67px] translate-x-[-50%] w-[238px]">Vanille-Cookies in Schneeflocken-Form</p>
    </div>
  );
}

function Text37() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[87.48px] top-[219.33px] w-[121.031px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e60076] text-[16px] text-center text-nowrap whitespace-pre">€22,90 / 15 Stück</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="[grid-area:1_/_2] h-[258.667px] justify-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container44 />
      <Heading15 />
      <Paragraph30 />
      <Text37 />
    </div>
  );
}

function Container46() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[258.667px] relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <Container45 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[314.667px] items-start left-[32px] top-[682.67px] w-[608px]" data-name="Container">
      <Heading13 />
      <Container46 />
    </div>
  );
}

function Text38() {
  return (
    <div className="absolute bg-[#e60076] h-[40px] left-[190.24px] rounded-[2.23696e+07px] top-0 w-[175.521px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[88px] text-[16px] text-center text-nowrap text-white top-[6.33px] translate-x-[-50%] whitespace-pre">🎁 Spezial-Angebot</p>
    </div>
  );
}

function Heading16() {
  return (
    <div className="absolute h-[24px] left-0 top-[56px] w-[556px]" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[278.46px] text-[#1e2939] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Adventskalender-Box</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[52px] left-0 top-[92px] w-[556px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[26px] left-[278.17px] text-[#1c398e] text-[16px] text-center top-[-2px] translate-x-[-50%] w-[554px]">24 handgemachte Mini-Cookies in verschiedenen Geschmacksrichtungen - der perfekte süße Begleiter durch die Adventszeit!</p>
    </div>
  );
}

function Text39() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[227.41px] top-[1.33px] w-[46.594px]" data-name="Text">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Arimo:Regular',sans-serif] font-normal leading-[24px] line-through relative shrink-0 text-[#6a7282] text-[16px] text-center text-nowrap whitespace-pre">€49,90</p>
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[282px] top-[1.33px] w-[46.594px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e60076] text-[16px] text-center text-nowrap whitespace-pre">€39,90</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[24px] left-0 top-[160px] w-[556px]" data-name="Container">
      <Text39 />
      <Text40 />
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[24px] left-0 top-[200px] w-[556px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[278.81px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Nur bis 10. Dezember!</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[224px] relative shrink-0 w-full" data-name="Container">
      <Text38 />
      <Heading16 />
      <Paragraph31 />
      <Container48 />
      <Paragraph32 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#eff6ff] h-[276px] items-start left-[32px] pb-[2px] pt-[26px] px-[26px] rounded-[16px] to-[#dbeafe] top-[1029.33px] w-[608px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container49 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[24px] w-[560px]" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[280.75px] text-[#1e2939] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Lust auf etwas Individuelles?</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[64px] w-[560px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[280.64px] text-[#364153] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Gestalten Sie Ihre eigene Traumtorte in nur 4 einfachen Schritten!</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute bg-gradient-to-b from-[#e60076] h-[56px] left-[174.5px] rounded-[2.23696e+07px] to-[#f6339a] top-[112px] w-[259px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[129px] text-[16px] text-center text-nowrap text-white top-[14.33px] translate-x-[-50%] whitespace-pre">Jetzt individuell bestellen →</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute bg-pink-50 h-[192px] left-[32px] rounded-[10px] top-[1337.33px] w-[608px]" data-name="Container">
      <Heading17 />
      <Paragraph33 />
      <Link4 />
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Wir freuen uns darauf, Ihnen die süßeste Zeit des Jahres zu versüßen!</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="font-['Arimo:Regular',sans-serif] font-normal h-[48px] leading-[24px] relative shrink-0 text-[#4a5565] text-[16px] text-nowrap w-full whitespace-pre" data-name="Paragraph">
      <p className="absolute left-0 top-[-1.67px]">Mit süßen Grüßen,</p>
      <p className="absolute left-0 top-[22.33px]">Ihr Team von Katrin Sweets 🍰✨</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[112.667px] items-start left-[32px] pb-0 pt-[24.667px] px-0 top-[1561.33px] w-[608px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Paragraph34 />
      <Paragraph35 />
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[1706px] relative shrink-0 w-full" data-name="Container">
      <Paragraph25 />
      <Paragraph26 />
      <Container41 />
      <Container47 />
      <Container50 />
      <Container51 />
      <Container52 />
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.14px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">Folgen Sie uns für tägliche süße Inspirationen!</p>
    </div>
  );
}

function Link5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[70.573px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[70.573px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[35px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">Instagram</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[67.281px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[67.281px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[34.5px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">Facebook</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[61.823px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[61.823px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[31px] text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%] whitespace-pre">Pinterest</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center size-full">
        <div className="box-border content-stretch flex gap-[24px] h-[24px] items-start justify-center pl-0 pr-[0.01px] py-0 relative w-full">
          <Link5 />
          <Link6 />
          <Link7 />
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="bg-gradient-to-b from-[#e60076] h-[128px] relative shrink-0 to-[#f6339a] w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[128px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Paragraph36 />
          <Container54 />
        </div>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[61.8px] top-[1.33px] w-[94.5px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e60076] text-[16px] text-center text-nowrap whitespace-pre">Katrin Sweets</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[24px] w-[624px]" data-name="Paragraph">
      <Text41 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[359.3px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">- Handgemachte Torten und Cookies mit Liebe gebacken</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[56px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.1px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Email: info@katrinsweets.de</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[84px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.25px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Tel: +49 123 456789</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[112px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.07px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Mo-Fr: 9:00 - 18:00 Uhr</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[152px] w-[624px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[312.41px] text-[#6a7282] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">Made with ❤️ for sweet lovers</p>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[255.42px] top-[185.33px] w-[161.156px]" data-name="Link">
      <p className="[text-underline-position:from-font] decoration-solid font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#6a7282] text-[16px] text-center text-nowrap underline whitespace-pre">Newsletter abbestellen</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-gray-100 h-[232px] relative shrink-0 w-full" data-name="Container">
      <Paragraph37 />
      <Paragraph38 />
      <Paragraph39 />
      <Paragraph40 />
      <Paragraph41 />
      <Link8 />
    </div>
  );
}

function Newsletter() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[2242px] items-start left-[112px] overflow-clip rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[40px] w-[672px]" data-name="Newsletter">
      <Container29 />
      <Container53 />
      <Container55 />
      <Container56 />
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[2282px] relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Newsletter />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] h-[5104px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container28 />
      <Container57 />
    </div>
  );
}

function App() {
  return (
    <div className="bg-gray-50 content-stretch flex flex-col gap-[48px] h-[5176px] items-start relative shrink-0 w-full" data-name="App">
      <Heading />
      <Container58 />
    </div>
  );
}

export default function EmailTemplatesCreation() {
  return (
    <div className="bg-white relative size-full" data-name="Email Templates Creation">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-[64px] relative size-full">
          <App />
        </div>
      </div>
    </div>
  );
}