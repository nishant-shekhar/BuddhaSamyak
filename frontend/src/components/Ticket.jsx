import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

const Ticket = ({ formData }) => {
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    const generateTicketId = () => {
      const randomId = Math.floor(
        10000000 + Math.random() * 90000000
      ).toString();
      setTicketId(randomId);
    };
    generateTicketId();
  }, []);

  const qrData = JSON.stringify({
    ...formData,
    ticketId,
  });

  return (
    <div id="ticket-to-download">
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-[350px] overflow-hidden rounded-3xl bg-[#ffffff] drop-shadow-2xl border border-[#d1d5db]">
        <div className="relative border-b border-[#d1d5db] p-6 text-xs">
          <div className="flex justify-between items-center mt-2">
            {/* Left side text */}
            <h3 className="text-sm font-semibold text-[#6b7280]">
              ENTRY TICKET
            </h3>

            {/* Right side images */}
            <div className="flex items-center gap-2">
              <img
                src="/buddha.png"
                alt="Logo 1"
                className="h-8 w-8 object-contain"
              />
              <img
                src="biharGovLogo.jpg"
                alt="Logo 2"
                className="h-8 w-8 object-contain"
              />
            </div>
          </div>

          <h1 className="text-2xl w-full leading-snug font-bold text-[#000000]">
            Buddha Samyak <br />
            Darshan Museum
          </h1>
          <div className="mt-4 border-t w-full border-dashed border-[#9ca3af]"></div>

          <div className="mt-6 space-y-4 text-[12px] text-[#6b7280]">
            {/* Row 1 */}
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <div className="text-xs text-[#9ca3af]">Full Name</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.fullName || "Name"}
                </div>
              </div>
              <div className="w-1/2 text-right">
                <div className="text-xs text-[#9ca3af]">Phone</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.phone || "Phone"}
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <div className="text-xs text-[#9ca3af]">Email</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.email || "Email"}
                </div>
              </div>
              <div className="w-1/2 text-right">
                <div className="text-xs text-[#9ca3af]">Country</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.country || "Country"}
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <div className="text-xs text-[#9ca3af]">Adults</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.adults || 0}
                </div>
              </div>
              <div className="w-1/2 text-right">
                <div className="text-xs text-[#9ca3af]">Children</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.children || 0}
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <div className="text-xs text-[#9ca3af]">Date</div>
                <div className="text-sm font-bold text-[#000000]">
                  {formData.date || "No Date"}
                </div>
              </div>
              <div className="w-1/2 text-right">
                <div className="text-xs text-[#9ca3af]">Session Type</div>
                <div className="text-sm font-bold text-[#000000] whitespace-nowrap">
                  {formData.sessionType || "No Session"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-dashed border-[#9ca3af]"></div>
          <div className="text-center mt-2">
            <p className="text-xs text-[#6b7280]">Ticket Number</p>
            <p className="text-xl font-extrabold rounded-md">
              <span>{ticketId}</span>
            </p>
          </div>
        </div>

        <div className="relative rounded-b-3xl bg-[#000000]">
          <div className="absolute inset-0 z-0 bg-[url(/ticketBgPattern.jpg)] bg-cover bg-center bg-no-repeat opacity-90 rounded-b-3xl"></div>

          <div className="relative z-10 flex items-center justify-center py-6">
            <div className="rounded-2xl bg-[#00000067] backdrop-blur-sm p-4">
              <QRCode
                value={qrData}
                size={150}
                fgColor="#000000"
                bgColor="#ffffff"
                className="rounded object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Ticket;
