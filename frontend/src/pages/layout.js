import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div lang="en">
        
      <div className="fixed">
        <text className="text-black">Layout</text>
      </div>

      <div>{children}</div>

    </div>
  );
}
