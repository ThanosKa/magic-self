import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: '100%' }}
                >
                    <rect x="20" y="30" width="50" height="45" rx="6" stroke="black" strokeWidth="6" transform="rotate(-10 50 50)" opacity="0.4" />
                    <rect x="25" y="30" width="50" height="45" rx="6" stroke="black" strokeWidth="6" transform="rotate(-5 50 50)" opacity="0.7" />
                    <rect x="30" y="30" width="50" height="45" rx="6" stroke="black" strokeWidth="6" fill="none" />

                    <line x1="40" y1="45" x2="70" y2="45" stroke="black" strokeWidth="6" strokeLinecap="round" />
                    <line x1="40" y1="55" x2="70" y2="55" stroke="black" strokeWidth="6" strokeLinecap="round" />
                    <line x1="40" y1="65" x2="60" y2="65" stroke="black" strokeWidth="6" strokeLinecap="round" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
