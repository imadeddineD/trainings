"use client"

type ClientsCarouselProps = {
  currentSection:any;
  user:any ;
  progress:any;
  sections:any
};

const SectionsNav: React.FC<ClientsCarouselProps>  = ({ currentSection, user, progress, sections }) => {
  // Helper to get title string if sections are objects
  const getTitle = (section:any) => (typeof section === "string" ? section : section.title);
  const sectionRoutes:any = {
  1: "/results",
  2: "/managerResults",
  3: "/finalResults",
  4: "/tips",
};
    const isResultsPage = ["/results", "/managerResults", "/finalResults","/tips"].includes(window.location.pathname);

  return (
    <nav>
      <div className="flex justify-between items-center max-[826px]:text-[14px] max-sm:text-[12px] text-center">
        <ul className="flex gap-7 max-[826px]:gap-2">
          <li>
            <a
            href="/login"
            onClick={() => localStorage.clear()}
            className="inline-block p-3 pt-1 max-sm:p-2 max-sm:pt-1"
          >
            تسجيل الخروج
          </a>
          </li>
          <li>
            <a
              className={`${
                currentSection === 1
                  ? "bg-[rgba(238,241,241,0.3)]"
                  : "bg-[rgba(117,116,113,0.189)] text-[#013b41]"
              } inline-block rounded-t-[9px] p-3 pt-1 max-sm:p-2 max-sm:pt-1`}
              href={"/quizz"}
            >
              الاختبارات الذاتية
            </a>
          </li>
          {sections.ismanager === 1 || (user.role_id === 4 || user.role_id === 3) && (
            <li>
              <a className="inline-block p-3 pt-1 max-sm:p-2 max-sm:pt-1" href={"/employees"} >
                تقييم الموظفين
              </a>
            </li>
          )}
        </ul>
        <span>رقم الموظف {user.user_id}</span>
      </div>

      <div className="bg-[#ecf4f5] border border-[#ffd32c] rounded-xl py-5 px-9 max-[826px]:p-4">
        <ul className="flex justify-between items-center w-full text-[#067a86] gap-5 max-[826px]:gap-3">
  {sections?.map((section:any, i:any) => {

    const sectionIndex:any = i + 1;
    const route = sectionRoutes[sectionIndex];

    // Highlight the current section and update progress/title/number accordingly
    const isActive = sectionIndex === currentSection;
    // Fix: Always return the <li> (don't skip index 3), and highlight correctly
    return (
      <li
      className={`flex-center flex-col gap-[10px] text-center ${
        sectionIndex !== currentSection ? "max-sm:hidden" : "max-sm:mx-auto"
      }`}
      key={typeof section === "string" ? section : section.id || i}
      >
      {route ? (
        !isResultsPage ? (

          <><span
              className={`border border-[#05707f] rounded-full size-[35px] max-[826px]:size-[31px] text-[24px] max-[826px]:text-[21px] transition-colors delay-700 flex-center ${isActive
                  ? "bg-[#ffd32c] text-[#067a86] font-bold"
                  : sectionIndex < currentSection
                    ? "bg-[#067a86] text-white"
                    : "bg-white"}`}
            >
              {sectionIndex}
            </span><h3
              className={`text-[20px] max-[826px]:text-[17px] ${isActive
                  ? "font-bold text-[#067a86]"
                  : sectionIndex < currentSection
                    ? "font-bold"
                    : ""} transition-[font-weight] delay-700`}
            >
                {getTitle(section)}
              </h3></>
        ) : (
        <a href={route}>
          <span
          className={`border border-[#05707f] rounded-full size-[35px] max-[826px]:size-[31px] text-[24px] max-[826px]:text-[21px] transition-colors delay-700 flex-center ${
            isActive
            ? "bg-[#ffd32c] text-[#067a86] font-bold"
            : sectionIndex < currentSection
            ? "bg-[#067a86] text-white"
            : "bg-white"
          }`}
          >
          {sectionIndex}
          </span>
          <h3
          className={`text-[20px] max-[826px]:text-[17px] ${
            isActive
            ? "font-bold text-[#067a86]"
            : sectionIndex < currentSection
            ? "font-bold"
            : ""
          } transition-[font-weight] delay-700`}
          >
          {getTitle(section)}
          </h3>
        </a>
        )
      ) : (
        <>
        <span
          className={`border border-[#05707f] rounded-full size-[35px] max-[826px]:size-[31px] text-[24px] max-[826px]:text-[21px] transition-colors delay-700 flex-center ${
          isActive
            ? "bg-[#ffd32c] text-[#067a86] font-bold"
            : sectionIndex < currentSection
            ? "bg-[#067a86] text-white"
            : "bg-white"
          }`}
        >
          {sectionIndex}
        </span>
        <h3
          className={`text-[20px] max-[826px]:text-[17px] ${
          isActive
            ? "font-bold text-[#067a86]"
            : sectionIndex < currentSection
            ? "font-bold"
            : ""
          } transition-[font-weight] delay-700`}
        >
          {getTitle(section)}
        </h3>
        </>
      )}
      </li>
    );
  })}
        </ul>

        {!isResultsPage && (
          <div className="bg-[#cdcece] border border-[#f5f5f6] rounded-[13px] w-full h-[21px] relative mt-[10px] max-sm:hidden">
            <div
              className={`absolute top-0 right-0 h-full ${
                currentSection === 1 ? "bg-[#ffd32c]" : "bg-[#067a86]"
              } rounded-[13px] border border-[#f5f5f6] transition-[width] duration-500 delay-500`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default SectionsNav;
