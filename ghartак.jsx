import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&family=Noto+Sans+Devanagari:wght@400;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body { font-family: 'Baloo 2', sans-serif; }

  .app {
    min-height: 100vh;
    background: #0f1923;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 40px;
    position: relative;
    overflow: hidden;
  }

  .bg-circles {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
  }
  .bg-circles span {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
  }
  .bg-circles span:nth-child(1) {
    width: 400px; height: 400px;
    background: #ff6b35;
    top: -100px; right: -100px;
  }
  .bg-circles span:nth-child(2) {
    width: 300px; height: 300px;
    background: #00c896;
    bottom: 100px; left: -80px;
  }

  .header {
    width: 100%;
    padding: 28px 24px 20px;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }

  .logo-icon {
    width: 44px; height: 44px;
    background: linear-gradient(135deg, #ff6b35, #ff9a35);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: 0 4px 20px rgba(255,107,53,0.4);
  }

  .logo-text {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(90deg, #ff6b35, #ffb347);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
  }

  .tagline {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .tab-bar {
    display: flex;
    background: rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 5px;
    margin: 10px 24px 0;
    gap: 4px;
    position: relative;
    z-index: 1;
    width: calc(100% - 48px);
    max-width: 420px;
  }

  .tab {
    flex: 1;
    padding: 10px;
    border: none;
    background: transparent;
    color: rgba(255,255,255,0.45);
    font-family: 'Baloo 2', sans-serif;
    font-size: 13px;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.25s;
  }

  .tab.active {
    background: linear-gradient(135deg, #ff6b35, #ff9a35);
    color: #fff;
    box-shadow: 0 4px 15px rgba(255,107,53,0.35);
  }

  .card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 28px 24px;
    margin: 20px 24px 0;
    width: calc(100% - 48px);
    max-width: 420px;
    position: relative;
    z-index: 1;
    backdrop-filter: blur(10px);
  }

  .section-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #ff6b35;
    margin-bottom: 16px;
  }

  .main-btn {
    width: 100%;
    padding: 18px;
    border: none;
    border-radius: 16px;
    font-family: 'Baloo 2', sans-serif;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #ff6b35, #ff9a35);
    color: #fff;
    box-shadow: 0 8px 25px rgba(255,107,53,0.35);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255,107,53,0.45);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .btn-secondary {
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.8);
    border: 1px solid rgba(255,255,255,0.12);
    margin-top: 12px;
    font-size: 15px;
  }

  .btn-green {
    background: linear-gradient(135deg, #00c896, #00e5b0);
    color: #0f1923;
    box-shadow: 0 8px 25px rgba(0,200,150,0.3);
    margin-top: 12px;
  }

  .btn-green:hover {
    transform: translateY(-2px);
  }

  .input-group {
    margin-top: 20px;
  }

  .input-label {
    font-size: 13px;
    color: rgba(255,255,255,0.55);
    margin-bottom: 8px;
    display: block;
    font-weight: 600;
  }

  .text-input {
    width: 100%;
    padding: 14px 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #fff;
    font-family: 'Baloo 2', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
  }

  .text-input:focus {
    border-color: rgba(255,107,53,0.5);
  }

  .text-input::placeholder {
    color: rgba(255,255,255,0.25);
  }

  .status-box {
    background: rgba(0,200,150,0.08);
    border: 1px solid rgba(0,200,150,0.2);
    border-radius: 14px;
    padding: 16px;
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .status-icon {
    width: 36px; height: 36px;
    background: rgba(0,200,150,0.15);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .status-text strong {
    font-size: 14px;
    color: #00c896;
    display: block;
    margin-bottom: 3px;
  }

  .status-text span {
    font-size: 12px;
    color: rgba(255,255,255,0.45);
  }

  .qr-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
    padding: 24px;
    background: rgba(255,255,255,0.03);
    border-radius: 20px;
    border: 1px dashed rgba(255,255,255,0.1);
  }

  .qr-container img {
    border-radius: 12px;
    border: 8px solid #fff;
  }

  .qr-label {
    margin-top: 14px;
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    text-align: center;
    letter-spacing: 0.5px;
  }

  .link-box {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 12px 14px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .link-text {
    flex: 1;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .copy-btn {
    padding: 6px 14px;
    background: rgba(255,107,53,0.15);
    border: 1px solid rgba(255,107,53,0.3);
    border-radius: 8px;
    color: #ff6b35;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    font-family: 'Baloo 2', sans-serif;
  }

  .copy-btn:hover {
    background: rgba(255,107,53,0.25);
  }

  .loading-pulse {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 20px;
    color: rgba(255,255,255,0.5);
    font-size: 14px;
  }

  .pulse-ring {
    width: 48px; height: 48px;
    border: 3px solid rgba(255,107,53,0.2);
    border-top-color: #ff6b35;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .scan-area {
    border: 2px dashed rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 40px 20px;
    text-align: center;
    margin-top: 8px;
  }

  .scan-icon {
    font-size: 56px;
    margin-bottom: 16px;
    display: block;
  }

  .scan-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .scan-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    line-height: 1.6;
  }

  .how-it-works {
    margin-top: 24px;
  }

  .step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .step:last-child { border-bottom: none; }

  .step-num {
    width: 32px; height: 32px;
    background: rgba(255,107,53,0.12);
    border: 1px solid rgba(255,107,53,0.25);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 800;
    color: #ff6b35;
    flex-shrink: 0;
  }

  .step-text strong {
    font-size: 14px;
    font-weight: 700;
    display: block;
    margin-bottom: 3px;
  }

  .step-text span {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    line-height: 1.5;
  }

  .badge {
    display: inline-block;
    padding: 4px 10px;
    background: rgba(255,107,53,0.12);
    border: 1px solid rgba(255,107,53,0.25);
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    color: #ff6b35;
    margin-bottom: 16px;
    letter-spacing: 0.5px;
  }

  .nav-big-btn {
    width: 100%;
    padding: 22px;
    border: none;
    border-radius: 20px;
    background: linear-gradient(135deg, #00c896, #00e5b0);
    color: #0a2a1f;
    font-family: 'Baloo 2', sans-serif;
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    box-shadow: 0 10px 30px rgba(0,200,150,0.35);
    transition: all 0.2s;
    margin-top: 8px;
  }

  .nav-big-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0,200,150,0.45);
  }

  .dest-card {
    background: rgba(0,200,150,0.06);
    border: 1px solid rgba(0,200,150,0.15);
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .dest-label {
    font-size: 11px;
    font-weight: 700;
    color: #00c896;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .dest-coords {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    font-family: monospace;
  }

  .copied-toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #00c896;
    color: #0a2a1f;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 14px;
    z-index: 100;
    animation: fadeUp 0.3s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;

export default function GharTak() {
  const [tab, setTab] = useState("customer");
  const [locationState, setLocationState] = useState("idle"); // idle | loading | saved
  const [coords, setCoords] = useState(null);
  const [landmark, setLandmark] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [deliveryInput, setDeliveryInput] = useState("");
  const [deliveryCoords, setDeliveryCoords] = useState(null);
  const [deliveryLandmark, setDeliveryLandmark] = useState("");

  const saveLocation = () => {
    if (!navigator.geolocation) {
      alert("Aapka browser location support nahi karta.");
      return;
    }
    setLocationState("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setCoords({ lat, lng });
        setLocationState("saved");
      },
      (err) => {
        alert("Location access denied. Please allow location permission.");
        setLocationState("idle");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const generateQR = () => {
    if (!coords) return;
    const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}${landmark ? `&travelmode=driving` : ""}`;
    const encodedLink = encodeURIComponent(mapsLink);
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedLink}&bgcolor=ffffff&color=0f1923&margin=10`;
    setQrUrl(qr);
    setShareLink(mapsLink);
  };

  useEffect(() => {
    if (coords) generateQR();
  }, [coords, landmark]);

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const parseDeliveryLink = () => {
    try {
      const url = new URL(deliveryInput.trim());
      const dest = url.searchParams.get("destination");
      if (dest) {
        const [lat, lng] = dest.split(",");
        setDeliveryCoords({ lat, lng });
        setDeliveryLandmark("");
      } else {
        alert("Valid GharTak link paste karo.");
      }
    } catch {
      // Try direct lat,lng
      const match = deliveryInput.match(/([-\d.]+),([-\d.]+)/);
      if (match) {
        setDeliveryCoords({ lat: match[1], lng: match[2] });
      } else {
        alert("Valid link paste karo.");
      }
    }
  };

  const openNavigation = () => {
    if (!deliveryCoords) return;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${deliveryCoords.lat},${deliveryCoords.lng}&travelmode=driving`,
      "_blank"
    );
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="bg-circles">
          <span /><span />
        </div>

        <div className="header">
          <div className="logo">
            <div className="logo-icon">🏠</div>
            <span className="logo-text">GharTak</span>
          </div>
          <div className="tagline">Ab koi address confusion nahi</div>
        </div>

        <div className="tab-bar">
          <button
            className={`tab ${tab === "customer" ? "active" : ""}`}
            onClick={() => setTab("customer")}
          >
            🏠 Ghar Wala
          </button>
          <button
            className={`tab ${tab === "delivery" ? "active" : ""}`}
            onClick={() => setTab("delivery")}
          >
            🛵 Delivery Boy
          </button>
        </div>

        {tab === "customer" && (
          <>
            <div className="card">
              <div className="badge">STEP 1</div>
              <div className="section-title">Apni Location Save Karo</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 20 }}>
                Apne ghar ke andar ya bahar khade hokar button dabaao. GPS se exact location capture ho jaayegi.
              </p>

              {locationState === "idle" && (
                <button className="main-btn btn-primary" onClick={saveLocation}>
                  📍 Abhi Location Save Karo
                </button>
              )}

              {locationState === "loading" && (
                <div className="loading-pulse">
                  <div className="pulse-ring" />
                  <span>GPS dhundh raha hai... thoda wait karo</span>
                </div>
              )}

              {locationState === "saved" && (
                <>
                  <div className="status-box">
                    <div className="status-icon">✅</div>
                    <div className="status-text">
                      <strong>Location Save Ho Gayi!</strong>
                      <span>{coords.lat}° N, {coords.lng}° E</span>
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Landmark add karo (optional)</label>
                    <input
                      className="text-input"
                      placeholder="Jaise: Neele gate wala ghar, SBI ATM ke paas..."
                      value={landmark}
                      onChange={e => setLandmark(e.target.value)}
                    />
                  </div>

                  <button
                    className="main-btn btn-secondary"
                    onClick={saveLocation}
                    style={{ marginTop: 14 }}
                  >
                    🔄 Dobara Location Lena
                  </button>
                </>
              )}
            </div>

            {locationState === "saved" && qrUrl && (
              <div className="card">
                <div className="badge">STEP 2</div>
                <div className="section-title">QR Code & Link Ready Hai!</div>

                <div className="qr-container">
                  <img src={qrUrl} alt="QR Code" width={200} height={200} />
                  <div className="qr-label">
                    Ye QR door pe lagao ya delivery boy ko share karo
                  </div>
                </div>

                <div className="link-box">
                  <span className="link-text">{shareLink}</span>
                  <button className="copy-btn" onClick={copyLink}>
                    📋 Copy
                  </button>
                </div>

                <button className="main-btn btn-green" onClick={copyLink}>
                  📤 Link Share Karo (WhatsApp pe)
                </button>
              </div>
            )}

            {locationState === "idle" && (
              <div className="card">
                <div className="section-title">Kaise Kaam Karta Hai?</div>
                <div className="how-it-works">
                  {[
                    { step: "1", title: "Ghar pe khade hokar location save karo", desc: "GPS se exact point capture ho jaata hai, koi address type karne ki zaroorat nahi" },
                    { step: "2", title: "QR Code aur Link mil jaata hai", desc: "Isko WhatsApp pe share karo, door pe chipkao, ya order note mein likho" },
                    { step: "3", title: "Delivery boy scan kare", desc: "Direct navigation shuru, ghar ke bahar aake call kare — bas!" },
                  ].map(s => (
                    <div className="step" key={s.step}>
                      <div className="step-num">{s.step}</div>
                      <div className="step-text">
                        <strong>{s.title}</strong>
                        <span>{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === "delivery" && (
          <>
            <div className="card">
              <div className="section-title">Customer Ka Link Scan Karo</div>

              <div className="scan-area">
                <span className="scan-icon">📷</span>
                <div className="scan-title">QR Scanner</div>
                <div className="scan-subtitle">
                  Customer ne jo link ya QR share kiya hai<br />use neeche paste karo
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Customer ka link yahan paste karo</label>
                <input
                  className="text-input"
                  placeholder="https://www.google.com/maps/dir/..."
                  value={deliveryInput}
                  onChange={e => setDeliveryInput(e.target.value)}
                />
              </div>

              <button
                className="main-btn btn-primary"
                style={{ marginTop: 16 }}
                onClick={parseDeliveryLink}
                disabled={!deliveryInput.trim()}
              >
                🗺️ Address Dhundho
              </button>
            </div>

            {deliveryCoords && (
              <div className="card">
                <div className="dest-card">
                  <div className="dest-label">📍 Destination Mila</div>
                  <div className="dest-coords">
                    {deliveryCoords.lat}, {deliveryCoords.lng}
                  </div>
                  {deliveryLandmark && (
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
                      🏷️ {deliveryLandmark}
                    </div>
                  )}
                </div>

                <button className="nav-big-btn" onClick={openNavigation}>
                  🛵 Navigation Shuru Karo
                </button>

                <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>
                  Ghar pahunchne ke baad hi call karo 📞
                </p>
              </div>
            )}

            {!deliveryCoords && (
              <div className="card">
                <div className="section-title">Delivery Boy Ke Liye</div>
                <div className="how-it-works">
                  {[
                    { step: "1", title: "Customer se link maango ya QR scan karo", desc: "WhatsApp pe link aa jaayega ya order slip pe QR hoga" },
                    { step: "2", title: "Link paste karo aur Navigate dabao", desc: "Google Maps seedha customer ke ghar tak le jaayega" },
                    { step: "3", title: "Ghar pahuncho, tab call karo", desc: "Aab baar baar call nahi karni padegi rasta poochne ke liye!" },
                  ].map(s => (
                    <div className="step" key={s.step}>
                      <div className="step-num">{s.step}</div>
                      <div className="step-text">
                        <strong>{s.title}</strong>
                        <span>{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {copied && (
          <div className="copied-toast">✅ Link Copy Ho Gaya!</div>
        )}
      </div>
    </>
  );
}
