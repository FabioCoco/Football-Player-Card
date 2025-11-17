import Link from "next/link";

export default function Home() {
  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #1a1a2e 75%, #0f0f1e 100%)',
        padding: '2rem 0',
      }}
    >
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center">
          <div className="col-md-3 text-center text-md-start mb-4 mb-md-0">
            <div className="text-white">
              <div className="mb-3">
                <div 
                  className="d-inline-block p-3 rounded-circle"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                    className="text-white"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                </div>
              </div>
              <h3 className="fw-bold mb-2" style={{ fontSize: '1.5rem' }}>NIM</h3>
              <p className="lead mb-0" style={{ fontSize: '1.8rem', fontWeight: '600' }}>
                535240077
              </p>
            </div>
          </div>

          <div className="col-md-6 text-center mb-4 mb-md-0">
            <div 
              className="p-5 rounded-4 mx-auto"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                maxWidth: '600px',
              }}
            >
              <div className="mb-4">
                <div 
                  className="d-inline-block p-4 rounded-circle mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="64" 
                    height="64" 
                    fill="white" 
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </div>
              </div>
              
              <h1 
                className="display-4 fw-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                eFootball Player Cards
              </h1>
              
              <p className="lead text-muted mb-4" style={{ lineHeight: '1.8' }}>
                Aplikasi web untuk mengelola koleksi kartu pemain eFootball. 
                Tambahkan, lihat detail, dan kelola koleksi pemain favorit Anda 
                dengan mudah. Fitur lengkap dengan penyimpanan lokal untuk 
                akses cepat dan praktis.
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link 
                  href="/players" 
                  className="btn btn-primary btn-lg px-5 py-3 fw-bold home-btn"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  Lihat Koleksi Pemain
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-3 text-center text-md-end mb-4 mb-md-0">
            <div className="text-white">
              <div className="mb-3">
                <div 
                  className="d-inline-block p-3 rounded-circle"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                    className="text-white"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                </div>
              </div>
              <h3 className="fw-bold mb-2" style={{ fontSize: '1.5rem' }}>Nama</h3>
              <p className="lead mb-0" style={{ fontSize: '1.8rem', fontWeight: '600' }}>
                Fabio Francisco
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="text-white-50">
              <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                Front-End Programming - Kuis Project
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
