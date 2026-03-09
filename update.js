const fs = require("fs");

const path = "d:/leadframestudio/clinic-full-service-landing-page/index.html";
const content = fs.readFileSync(path, "utf8");
const lines = content.split("\n"); // Windows lines or purely \n?

const newHtml = `    <!-- Unified Problem & Solution Section -->
    <section class="relative w-full min-h-[100dvh] bg-white flex flex-col items-center justify-center py-20 overflow-hidden z-20">
      <!-- Floating Images for Desktop -->
      <div class="absolute inset-0 z-0 pointer-events-none hidden lg:block">

        <!-- TOP LEFT QUADRANT -->
        <!-- Far Left Top -->
        <div class="absolute top-[25%] left-[3%] w-28 h-28 xl:w-32 xl:h-32 rounded-[2rem] overflow-hidden">
          <img src="images/problem-2.avif" class="w-full h-full object-cover" alt="Clinic Staff" />
        </div>
        <!-- Inner Left Top -->
        <div class="absolute top-[20%] left-[18%] w-32 h-32 xl:w-40 xl:h-40 rounded-[2rem] overflow-hidden">
          <img src="images/problem-1.avif" class="w-full h-full object-cover" alt="Waiting Room" />
        </div>

        <!-- BOTTOM LEFT QUADRANT -->
        <!-- Far Left Bottom -->
        <div class="absolute bottom-[20%] left-[3%] w-32 h-32 xl:w-36 xl:h-36 rounded-[2rem] overflow-hidden">
          <img src="images/problem-3.avif" class="w-full h-full object-cover" alt="Patient Care" />
        </div>
        <!-- Inner Left Bottom -->
        <div class="absolute bottom-[15%] left-[18%] w-32 h-32 xl:w-40 xl:h-40 rounded-[2rem] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover" alt="Medical Consultation" />
        </div>

        <!-- TOP RIGHT QUADRANT -->
        <!-- Inner Right Top -->
        <div class="absolute top-[20%] right-[18%] w-32 h-32 xl:w-36 xl:h-36 rounded-[2rem] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover" alt="Doctor" />
        </div>
        <!-- Far Right Top -->
        <div class="absolute top-[25%] right-[3%] w-28 h-28 xl:w-32 xl:h-32 rounded-[2rem] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover" alt="Modern Clinic" />
        </div>

        <!-- BOTTOM RIGHT QUADRANT -->
        <!-- Inner Right Bottom -->
        <div class="absolute bottom-[15%] right-[18%] w-32 h-32 xl:w-40 xl:h-40 rounded-[2rem] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover" alt="Medical Data" />
        </div>
        <!-- Far Right Bottom -->
        <div class="absolute bottom-[20%] right-[3%] w-32 h-32 xl:w-36 xl:h-36 rounded-[2rem] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover" alt="Healthcare Professional" />
        </div>

      </div>

      <!-- Central Content -->
      <div class="relative z-10 px-6 w-full max-w-[800px] text-center flex flex-col items-center bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none rounded-[2rem] py-12 lg:py-0">
        <h2 class="font-serif text-[#888888] text-[20px] lg:text-[24px] mb-6">
          We built our own protocol.
        </h2>
        <p class="font-serif text-[#111111] text-[22px] lg:text-[28px] leading-[1.4] md:leading-[1.5]">
          Our revolutionary Digital Clinic Platform enables—for the first time ever—true efficiency, generalizing to different practice sizes, demographics, and healthcare environments. This breakthrough is powered by the same integrated structure acting as a shared brain for both patient booking and clinic management.
        </p>
      </div>
      
      <!-- Mobile Floating Images Summary -->
      <div class="flex lg:hidden flex-wrap justify-center gap-4 mt-8 px-4 z-10">
         <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden shadow-sm">
           <img src="images/problem-1.avif" class="w-full h-full object-cover" alt="Clinic Visual" />
         </div>
         <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden shadow-sm">
           <img src="images/problem-2.avif" class="w-full h-full object-cover" alt="Clinic Visual" />
         </div>
         <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden shadow-sm">
           <img src="images/problem-3.avif" class="w-full h-full object-cover" alt="Clinic Visual" />
         </div>
         <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden shadow-sm">
           <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover" alt="Clinic Visual" />
         </div>
      </div>
    </section>\r`;

// find indices
let startIdx = lines.findIndex((line) =>
  line.includes("<!-- Problem Section (Relatable Pain) -->"),
);
let endIdx =
  lines.findIndex(
    (line, i) =>
      i > startIdx &&
      line.includes("<!-- The Stacking Protocol (Services) -->"),
  ) - 1;

if (startIdx !== -1 && endIdx !== -1) {
  const newLines = [
    ...lines.slice(0, startIdx),
    newHtml,
    ...lines.slice(endIdx + 1),
  ];
  fs.writeFileSync(path, newLines.join("\n"), "utf8");
  console.log("Update successful. Lines replaced:", startIdx, "to", endIdx);
} else {
  console.log("Could not find start or end index", startIdx, endIdx);
}
