import { QRCode } from "react-qrcode-logo";

export default function Ticket({ formData }) {
  const ticketNo = String(formData.ticketNo ?? "").padStart(6, "0");

  const qrPayload = JSON.stringify({
    id: formData.qrData?.id ?? null,
    t: ticketNo || null,
    d: formData.date ?? null,
    s: formData.sessionType ?? null,
  });

  return (
    <div id="ticket-to-download" className="flex items-center justify-center p-6">
      <div
        id="ticket-card"
        className="
          w-[350px] overflow-hidden rounded-3xl
          bg-[#ffffff]              
          drop-shadow-2xl
          border border-[#d1d5db]   m-6
        "
      >
        <div className="relative border-b border-[#d1d5db] p-6 text-xs">
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-sm font-semibold text-[#6b7280]">ENTRY TICKET</h3> {/* was text-gray-500 */}
            <div className="flex items-center gap-2">
              <img src="/buddha.png" alt="Buddha Samyak" className="h-8 w-8 object-contain" crossOrigin="anonymous" />
              <img src="/biharGovLogo.jpg" alt="Bihar Govt." className="h-8 w-8 object-contain" crossOrigin="anonymous" />
            </div>
          </div>

          <h1 className="text-2xl w-full leading-snug font-bold text-[#000000]">
            Buddha Samyak <br /> Darshan Museum
          </h1>

          <div className="mt-4 border-t w-full border-dashed border-[#9ca3af]" /> {/* was border-gray-400 */}

          <div className="mt-6 space-y-4 text-[12px] text-[#6b7280]">       {/* was text-gray-500 */}
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <div className="text-xs text-[#9ca3af]">Full Name</div>      {/* was text-gray-400 */}
                <div className="text-sm font-bold text-[#000000]">
                  {formData.fullName || "—"}
                </div>
              </div>
              <div className="w-1/2 text-right">
                <div className="text-xs text-[#9ca3af]">Phone</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.phone || "—"}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <div className="text-xs text-[#9ca3af]">Email</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.email || "—"}
                </div>
              </div>
              <div className="w-1/2 text-right">
                <div className="text-xs text-[#9ca3af]">Country</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.country || "—"}
                </div>
              </div>
            </div>

            {formData.ticketType === "group" ? (
              <>
                <div className="flex justify-between gap-4">
                  <div className="w-1/2">
                    <div className="text-xs text-[#9ca3af]">Group Type</div>
                    <div className="text-sm font-bold text-[#000000]">
                      {formData.groupCategory === "tourist" ? "Tourist Group" : "Student Group"}
                    </div>
                  </div>
                  <div className="w-1/2 text-right">
                    <div className="text-xs text-[#9ca3af]">Group Size</div>
                    <div className="text-sm font-bold text-[#000000]">
                      {formData.groupSize ?? 0}
                    </div>
                  </div>
                </div>

                {(formData.leaderName || formData.instituteName) && (
                  <div className="flex justify-between gap-4">
                    <div className="w-1/2">
                      <div className="text-xs text-[#9ca3af]">
                        {formData.groupCategory === "tourist" ? "Team Leader" : "Institute"}
                      </div>
                     <div className="text-sm font-bold text-[#000000] whitespace-normal break-words leading-snug">
  {formData.groupCategory === "tourist" ? (formData.leaderName || "—") : (formData.instituteName || "—")}
</div>

                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-between gap-4">
                <div className="w-1/2">
                  <div className="text-xs text-[#9ca3af]">Adults</div>
                  <div className="text-sm font-bold text-[#000000]">
                    {formData.adults ?? 0}
                  </div>
                </div>
                <div className="w-1/2 text-right">
                  <div className="text-xs text-[#9ca3af]">Children</div>
                  <div className="text-sm font-bold text-[#000000]">
                    {formData.children ?? 0}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <div className="text-xs text-[#9ca3af]">Date</div>
                <div className="text-sm font-bold text-[#000000]">
                 {formData.date
  ? new Date(formData.date).toLocaleDateString("en-GB")  // outputs dd/mm/yyyy
  : "No Date"}
                </div>
              </div>
              <div className="w-1/2 text-right">
                <div className="text-xs text-[#9ca3af]">Session</div>
                <div className="text-sm font-bold text-[#000000] whitespace-nowrap">
                  {formData.sessionType || "No Session"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-dashed border-[#9ca3af]" />
          <div className="text-center mt-2">
            <p className="text-xs text-[#6b7280]">Ticket Number</p>
            <p className="text-xl font-extrabold rounded-md tracking-wider text-[#000000]">
              {ticketNo || "—"}
            </p>
          </div>
        </div>

        {/* QR block */}
        <div className="relative rounded-b-3xl bg-[#000000]">  {/* was bg-black */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90 rounded-b-3xl"
            style={{ backgroundImage: "url('/ticketBgPattern.jpg')" }}
          />
          <div className="relative z-10 flex items-center justify-center py-6">
            <div
              className="rounded-2xl backdrop-blur-sm p-3"
              style={{ backgroundColor: "rgba(0,0,0,0.4)" }} 
            >
              <QRCode
                value={qrPayload}
                renderAs="canvas"
                size={180}
                quietZone={8}
                ecLevel="M"
                fgColor="#000000"
                bgColor="#ffffff"
                qrStyle="squares"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
