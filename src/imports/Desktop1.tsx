import svgPaths from "./svg-gck1tm0yk4";
import imgRectangle1523 from '@/assets/2b3e7bb5588c3528566a362c8af4a578b7ffaf86.png';

function Card() {
  return (
    <div className="relative size-full" data-name="Card">
      <div className="absolute bg-[#d9d9d9] bottom-0 left-0 right-[45.724%] top-[14.508%]" />
      <div className="absolute bottom-[91.71%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[-0.987%] not-italic right-[77.961%] text-[#323232] text-[32px] text-left text-nowrap top-0 uppercase">
        <p className="block leading-[normal] whitespace-pre">[uniqlo]</p>
      </div>
      <div className="absolute bottom-[4.663%] left-[55.921%] right-[33.388%] top-[95.337%]">
        <div className="absolute bottom-[-7.364px] left-0 right-[-1.538%] top-[-7.364px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 66 16"
          >
            <path
              d={svgPaths.p20b98500}
              fill="var(--stroke-0, #323232)"
              id="Line 27"
            />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[46.632%] font-['Anonymous_Pro:Regular',_sans-serif] leading-[normal] left-[55.921%] not-italic right-[3.289%] text-[#323232] text-[15px] text-left top-[17.098%] uppercase">
        <p className="block mb-2.5">
          Answered calls and processed orders, managed correspondence with
          clients and partners.
        </p>
        <p className="block mb-2.5">
          Consulted clients and assisted in order form completion.
        </p>
        <p className="block">
          Formulated shipping requests and coordinated <br />
          with transport companies.
        </p>
      </div>
      <div className="absolute bottom-[91.71%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[47.697%] not-italic right-[45.724%] text-[#323232] text-[18px] text-left text-nowrap top-[3.627%] uppercase">
        <p className="block leading-[normal] whitespace-pre">2024</p>
      </div>
      <div className="[flex-flow:wrap] absolute box-border content-start flex font-['Anonymous_Pro:Bold',_sans-serif] gap-2 items-start justify-start leading-[0] left-[340px] not-italic p-0 text-[#323232] text-[18px] text-left text-nowrap top-[294px] uppercase w-[251px]">
        <div className="relative shrink-0">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            [web design]
          </p>
        </div>
        <div className="relative shrink-0">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            [e-commerce]
          </p>
        </div>
        <div className="relative shrink-0">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            [ui/ux design]
          </p>
        </div>
      </div>
    </div>
  );
}

interface Component1Props {
  property1?: "Default" | "Variant2" | "Variant3";
}

function Component1({ property1 = "Default" }: Component1Props) {
  if (property1 === "Variant2") {
    return (
      <div className="relative size-full" data-name="Property 1=Variant2">
        <div className="absolute bg-[#87832e] inset-0" />
        <div
          className="absolute bottom-[9.091%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] not-italic text-[#ffffff] text-[18px] text-left text-nowrap top-[9.091%] uppercase"
          style={{ left: "calc(50% - 20px)" }}
        >
          <p className="block leading-[normal] whitespace-pre">norm</p>
        </div>
      </div>
    );
  }
  if (property1 === "Variant3") {
    return (
      <div className="relative size-full" data-name="Property 1=Variant3">
        <div className="absolute bg-[#87332e] inset-0" />
        <div className="absolute bottom-[9.091%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[18.75%] not-italic right-[18.75%] text-[#ffffff] text-[18px] text-left text-nowrap top-[9.091%] uppercase">
          <p className="block leading-[normal] whitespace-pre">miss</p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative shrink-0">
      <p className="block leading-[normal] text-nowrap whitespace-pre">
        [ui/ux design]
      </p>
    </div>
  );
}

interface ProjectCardProps {
  name?: string;
  year?: string;
}

function ProjectCard({ name = "uniqlo", year = "2024" }: ProjectCardProps) {
  return (
    <div className="relative size-full" data-name="project_card">
      <div className="absolute bottom-[54.286%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-0 not-italic right-[79.808%] text-[#323232] text-[32px] text-left text-nowrap top-0 uppercase">
        <p className="block leading-[normal] whitespace-pre">{name}</p>
      </div>
      <div
        className="[flex-flow:wrap] absolute bottom-[2.857%] box-border content-start flex font-['Anonymous_Pro:Bold',_sans-serif] gap-2 items-start justify-start leading-[0] left-0 not-italic p-0 right-1/4 text-[#323232] text-[18px] text-left text-nowrap top-[71.429%] uppercase"
        data-name="tags"
      >
        <div className="relative shrink-0">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            [web design]
          </p>
        </div>
        <div className="relative shrink-0">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            [e-commerce]
          </p>
        </div>
        <div className="relative shrink-0">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            [ui/ux design]
          </p>
        </div>
      </div>
      <div className="absolute bg-[#323232] bottom-[37.143%] left-0 right-0 top-[57.143%]" />
      <div className="absolute bottom-[54.286%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[89.808%] not-italic right-0 text-[#000000] text-[24px] text-nowrap text-right top-[11.429%] uppercase">
        <p className="block leading-[normal] whitespace-pre">{year}</p>
      </div>
      <div
        className="absolute bottom-0 left-[87.692%] right-0 top-[68.571%]"
        data-name="Component 1"
      >
        <Component1 />
      </div>
    </div>
  );
}

function Frame153() {
  return (
    <div className="absolute box-border content-stretch flex flex-row gap-2.5 items-center justify-center left-1/2 p-[10px] rounded-[80px] top-[2116px] translate-x-[-50%] w-[560px]">
      <div className="absolute border border-[#323232] border-solid inset-0 pointer-events-none rounded-[80px]" />
      <div className="font-['Inter:Extra_Light_Italic',_sans-serif] font-extralight italic leading-[0] relative shrink-0 text-[#323232] text-[40px] text-left text-nowrap tracking-[8px] uppercase">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          All Projects
        </p>
      </div>
    </div>
  );
}

function Frame152() {
  return (
    <div
      className="h-[70px] relative shrink-0 w-[520px]"
      data-name="project_card"
    >
      <div className="absolute bottom-[54.286%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-0 not-italic right-[79.808%] text-[#323232] text-[32px] text-left text-nowrap top-0 uppercase">
        <p className="block leading-[normal] whitespace-pre">uniqlo</p>
      </div>
      <div
        className="[flex-flow:wrap] absolute bottom-[2.857%] box-border content-start flex font-['Anonymous_Pro:Bold',_sans-serif] gap-2 items-start justify-start leading-[0] left-0 not-italic p-0 right-1/4 text-[#323232] text-[18px] text-left text-nowrap top-[71.429%] uppercase"
        data-name="tags"
      >
        <div className="relative shrink-0">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            [web design]
          </p>
        </div>
        <div className="relative shrink-0">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            [e-commerce]
          </p>
        </div>
        <div className="relative shrink-0">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            [ui/ux design]
          </p>
        </div>
      </div>
      <div className="absolute bg-[#323232] bottom-[37.143%] left-0 right-0 top-[57.143%]" />
      <div className="absolute bottom-[54.286%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[89.808%] not-italic right-0 text-[#000000] text-[24px] text-nowrap text-right top-[11.429%] uppercase">
        <p className="block leading-[normal] whitespace-pre">2024</p>
      </div>
      <div
        className="absolute bottom-0 left-[87.692%] right-0 top-[68.571%]"
        data-name="Component 1"
      >
        <div className="absolute bg-[#87332e] inset-0" />
        <div className="absolute bottom-[9.091%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[18.75%] not-italic right-[18.75%] text-[#ffffff] text-[18px] text-left text-nowrap top-[9.091%] uppercase">
          <p className="block leading-[normal] whitespace-pre">miss</p>
        </div>
      </div>
    </div>
  );
}

function Frame154() {
  return (
    <div className="[flex-flow:wrap] absolute box-border content-start flex font-['Anonymous_Pro:Bold',_sans-serif] gap-2 items-start justify-start leading-[0] left-[340px] not-italic p-0 text-[#323232] text-[18px] text-left text-nowrap top-[294px] uppercase w-[251px]">
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [app design]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [social]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [ui/ux design]
        </p>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div
      className="absolute h-[386px] left-[100px] top-[1630px] w-[608px]"
      data-name="Card"
    >
      <div className="absolute bg-[#d9d9d9] bottom-0 left-0 right-[45.724%] top-[14.508%]" />
      <div className="absolute bottom-[91.71%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[-0.987%] not-italic right-[66.447%] text-[#323232] text-[32px] text-left text-nowrap top-0 uppercase">
        <p className="block leading-[normal] whitespace-pre">[Massage_me]</p>
      </div>
      <div className="absolute bottom-[4.663%] left-[55.921%] right-[33.388%] top-[95.337%]">
        <div className="absolute bottom-[-7.364px] left-0 right-[-1.538%] top-[-7.364px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 66 16"
          >
            <path
              d={svgPaths.p20b98500}
              fill="var(--stroke-0, #323232)"
              id="Line 27"
            />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[46.632%] font-['Anonymous_Pro:Regular',_sans-serif] leading-[normal] left-[55.921%] not-italic right-[3.289%] text-[#323232] text-[15px] text-left top-[17.098%] uppercase">
        <p className="block mb-2.5">
          Answered calls and processed orders, managed correspondence with
          clients and partners.
        </p>
        <p className="block mb-2.5">
          Consulted clients and assisted in order form completion.
        </p>
        <p className="block">
          {`Formulated shipping requests and coordinated `}
          <br />
          with transport companies.
        </p>
      </div>
      <div className="absolute bottom-[91.71%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[47.697%] not-italic right-[45.724%] text-[#323232] text-[18px] text-left text-nowrap top-[3.627%] uppercase">
        <p className="block leading-[normal] whitespace-pre">2024</p>
      </div>
      <Frame154 />
    </div>
  );
}

function Frame155() {
  return (
    <div className="[flex-flow:wrap] absolute box-border content-start flex font-['Anonymous_Pro:Bold',_sans-serif] gap-2 items-start justify-start leading-[0] left-[340px] not-italic p-0 text-[#323232] text-[18px] text-left text-nowrap top-[294px] uppercase w-[251px]">
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [web design]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [e-commerce]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [ui/ux design]
        </p>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div
      className="absolute h-[386px] left-[720px] top-[1204px] w-[608px]"
      data-name="Card"
    >
      <div className="absolute bg-[#d9d9d9] bottom-0 left-0 right-[45.724%] top-[14.508%]" />
      <div className="absolute bottom-[91.71%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[-0.987%] not-italic right-[77.961%] text-[#323232] text-[32px] text-left text-nowrap top-0 uppercase">
        <p className="block leading-[normal] whitespace-pre">[OmHOME]</p>
      </div>
      <div className="absolute bottom-[4.663%] left-[55.921%] right-[33.388%] top-[95.337%]">
        <div className="absolute bottom-[-7.364px] left-0 right-[-1.538%] top-[-7.364px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 66 16"
          >
            <path
              d={svgPaths.p20b98500}
              fill="var(--stroke-0, #323232)"
              id="Line 27"
            />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[46.632%] font-['Anonymous_Pro:Regular',_sans-serif] leading-[normal] left-[55.921%] not-italic right-[3.289%] text-[#323232] text-[15px] text-left top-[17.098%] uppercase">
        <p className="block mb-2.5">
          Answered calls and processed orders, managed correspondence with
          clients and partners.
        </p>
        <p className="block mb-2.5">
          Consulted clients and assisted in order form completion.
        </p>
        <p className="block">
          {`Formulated shipping requests and coordinated `}
          <br />
          with transport companies.
        </p>
      </div>
      <div className="absolute bottom-[91.71%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[47.697%] not-italic right-[45.724%] text-[#323232] text-[18px] text-left text-nowrap top-[3.627%] uppercase">
        <p className="block leading-[normal] whitespace-pre">2024</p>
      </div>
      <Frame155 />
    </div>
  );
}

function Frame156() {
  return (
    <div className="[flex-flow:wrap] absolute box-border content-start flex font-['Anonymous_Pro:Bold',_sans-serif] gap-2 items-start justify-start leading-[0] left-[340px] not-italic p-0 text-[#323232] text-[18px] text-left text-nowrap top-[294px] uppercase w-[251px]">
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [web design]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [e-commerce]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [ui/ux design]
        </p>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div
      className="absolute h-[386px] left-[720px] top-[1630px] w-[608px]"
      data-name="Card"
    >
      <div className="absolute bg-[#d9d9d9] bottom-0 left-0 right-[45.724%] top-[14.508%]" />
      <div className="absolute bottom-[91.71%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[-0.987%] not-italic right-[77.961%] text-[#323232] text-[32px] text-left text-nowrap top-0 uppercase">
        <p className="block leading-[normal] whitespace-pre">[uniqlo]</p>
      </div>
      <div className="absolute bottom-[4.663%] left-[55.921%] right-[33.388%] top-[95.337%]">
        <div className="absolute bottom-[-7.364px] left-0 right-[-1.538%] top-[-7.364px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 66 16"
          >
            <path
              d={svgPaths.p20b98500}
              fill="var(--stroke-0, #323232)"
              id="Line 27"
            />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[46.632%] font-['Anonymous_Pro:Regular',_sans-serif] leading-[normal] left-[55.921%] not-italic right-[3.289%] text-[#323232] text-[15px] text-left top-[17.098%] uppercase">
        <p className="block mb-2.5">
          Answered calls and processed orders, managed correspondence with
          clients and partners.
        </p>
        <p className="block mb-2.5">
          Consulted clients and assisted in order form completion.
        </p>
        <p className="block">
          {`Formulated shipping requests and coordinated `}
          <br />
          with transport companies.
        </p>
      </div>
      <div className="absolute bottom-[91.71%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[47.697%] not-italic right-[45.724%] text-[#323232] text-[18px] text-left text-nowrap top-[3.627%] uppercase">
        <p className="block leading-[normal] whitespace-pre">2024</p>
      </div>
      <Frame156 />
    </div>
  );
}

function Tags1() {
  return (
    <div
      className="[flex-flow:wrap] absolute bottom-[2.857%] box-border content-start flex font-['Anonymous_Pro:Bold',_sans-serif] gap-2 items-start justify-start leading-[0] left-0 not-italic p-0 right-1/4 text-[#323232] text-[18px] text-left text-nowrap top-[71.429%] uppercase"
      data-name="tags"
    >
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [web design]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [e-commerce]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [ui/ux design]
        </p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div
      className="absolute bottom-0 left-[87.692%] right-0 top-[68.571%]"
      data-name="Component 1"
    >
      <div className="absolute bg-[#87832e] inset-0" />
      <div
        className="absolute bottom-[9.091%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] not-italic text-[#ffffff] text-[18px] text-left text-nowrap top-[9.091%] uppercase"
        style={{ left: "calc(50% - 20px)" }}
      >
        <p className="block leading-[normal] whitespace-pre">norm</p>
      </div>
    </div>
  );
}

function ProjectCard1() {
  return (
    <div
      className="h-[70px] relative shrink-0 w-[520px]"
      data-name="project_card"
    >
      <div className="absolute bottom-[54.286%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-0 not-italic right-[79.808%] text-[#323232] text-[32px] text-left text-nowrap top-0 uppercase">
        <p className="block leading-[normal] whitespace-pre">uniqlo</p>
      </div>
      <Tags1 />
      <div className="absolute bg-[#323232] bottom-[37.143%] left-0 right-0 top-[57.143%]" />
      <div className="absolute bottom-[54.286%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[89.808%] not-italic right-0 text-[#000000] text-[24px] text-nowrap text-right top-[11.429%] uppercase">
        <p className="block leading-[normal] whitespace-pre">2024</p>
      </div>
      <Component2 />
    </div>
  );
}

function Tags3() {
  return (
    <div
      className="[flex-flow:wrap] absolute bottom-[2.857%] box-border content-start flex font-['Anonymous_Pro:Bold',_sans-serif] gap-2 items-start justify-start leading-[0] left-0 not-italic p-0 right-1/4 text-[#323232] text-[18px] text-left text-nowrap top-[71.429%] uppercase"
      data-name="tags"
    >
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [web design]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [e-commerce]
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          [ui/ux design]
        </p>
      </div>
    </div>
  );
}

function Component4() {
  return (
    <div
      className="absolute bottom-0 left-[87.692%] right-0 top-[68.571%]"
      data-name="Component 1"
    >
      <div className="absolute bg-[#5b872e] inset-0" />
      <div
        className="absolute bottom-[9.091%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] not-italic text-[#ffffff] text-[18px] text-left text-nowrap top-[9.091%] uppercase"
        style={{ left: "calc(50% - 20px)" }}
      >
        <p className="block leading-[normal] whitespace-pre">good</p>
      </div>
    </div>
  );
}

function ProjectCard3() {
  return (
    <div
      className="h-[70px] relative shrink-0 w-[520px]"
      data-name="project_card"
    >
      <div className="absolute bottom-[54.286%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-0 not-italic right-[79.808%] text-[#323232] text-[32px] text-left text-nowrap top-0 uppercase">
        <p className="block leading-[normal] whitespace-pre">uniqlo</p>
      </div>
      <Tags3 />
      <div className="absolute bg-[#323232] bottom-[37.143%] left-0 right-0 top-[57.143%]" />
      <div className="absolute bottom-[54.286%] font-['Anonymous_Pro:Bold',_sans-serif] leading-[0] left-[89.808%] not-italic right-0 text-[#000000] text-[24px] text-nowrap text-right top-[11.429%] uppercase">
        <p className="block leading-[normal] whitespace-pre">2024</p>
      </div>
      <Component4 />
    </div>
  );
}

function Project() {
  return (
    <div
      className="[flex-flow:wrap] absolute box-border content-start flex gap-[100px] items-start justify-start left-[100px] p-0 top-[2244px] w-[1240px]"
      data-name="project"
    >
      <div
        className="h-[70px] relative shrink-0 w-[520px]"
        data-name="project_card"
      >
        <ProjectCard />
      </div>
      <ProjectCard1 />
      <Frame152 />
      <ProjectCard3 />
      <ProjectCard3 />
      <ProjectCard1 />
      <ProjectCard3 />
      <ProjectCard3 />
      <ProjectCard1 />
      <ProjectCard3 />
    </div>
  );
}

export default function Desktop1() {
  return (
    <div className="bg-[#fffded] relative size-full" data-name="Desktop - 1">
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[0] left-[720px] not-italic text-[#323232] text-[159px] text-left text-nowrap top-[72px] tracking-[6.36px] uppercase">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          Artem
        </p>
      </div>
      <div className="absolute font-['Anonymous_Pro:Regular',_sans-serif] leading-[0] left-[720px] not-italic text-[#323232] text-[24px] text-left top-[284px] tracking-[0.48px] uppercase w-[500px]">
        <p className="adjustLetterSpacing block leading-[normal]">
          Seeking a position in design or project management where i can help
          you with project visualization, process optimization, and solving
          business problems. My goal is to work with a steady stream of orders
          and clients.
        </p>
      </div>
      <div
        className="absolute font-['Anonymous_Pro:Regular',_sans-serif] leading-[0] not-italic text-[#323232] text-[31px] text-left top-[812px] tracking-[0.62px] uppercase w-[1073px]"
        style={{ left: "calc(50% - 620px)" }}
      >
        <p className="adjustLetterSpacing block leading-[normal]">
          Graphic and web design * Zero-code services * AI (midjourney, chatgpt,
          etc) * Project management * Event organization
          <br />
          {`Client communication * Business process optimization `}
          <br />
          Visual concept creatioN * Social media promotion
        </p>
      </div>
      <div
        className="[background-size:256.27%_155%] absolute bg-[59.08%_100%] bg-no-repeat h-[620px] left-[100px] top-[105px] w-[500px]"
        style={{ backgroundImage: `url('${imgRectangle1523}')` }}
      />
      <div
        className="absolute font-['Inter:Extra_Light_Italic',_sans-serif] font-extralight italic leading-[0] text-[#323232] text-[46px] text-left text-nowrap top-[1023px] tracking-[11.04px] uppercase"
        style={{ left: "calc(50% - 248px)" }}
      >
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          MAin Projects
        </p>
      </div>
      <Frame153 />
      <div className="absolute h-14 left-1/2 rounded-[90px] top-[1023px] translate-x-[-50%] w-[560px]">
        <div className="absolute border-2 border-[#323232] border-solid inset-0 pointer-events-none rounded-[90px]" />
      </div>
      <div
        className="absolute h-[386px] left-[100px] top-[1204px] w-[608px]"
        data-name="Card"
      >
        <Card />
      </div>
      <Card1 />
      <Card2 />
      <Card3 />
      <Project />
    </div>
  );
}