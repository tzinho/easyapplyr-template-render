import Image from "next/image";

import { WaitlistForm } from "~/components/waitlist-form";
import { SocialLinks } from "~/components/social-links";
import { WaitlistAvatars } from "~/components/waitlist-avatars";
import { BackgroundLines } from "~/components/background-lines";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary to-[#331F0D] p-4">
      <BackgroundLines className="flex w-full flex-col items-center justify-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />

        <div className="relative mx-auto h-full w-full max-w-2xl space-y-12 px-4 text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <Image
              src="/android-launchericon-144-144.png"
              width={72}
              height={72}
              alt="Logo Easyapplyr"
              className="rounded-full shadow-lg ring-2 ring-primary"
            />
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Junte-se a Easyapplyr <br />
              <span className="text-xl font-black">
                Faça parte da lista de espera
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
              Faça parte de algo verdadeiramente extraordinário. Junte -se a
              milhares de outras pessoas que já ganham acesso precoce ao nosso
              novo produto revolucionário.
            </p>
          </div>

          <WaitlistForm />

          <WaitlistAvatars />

          <div className="pt-12">
            <SocialLinks />
          </div>
        </div>
      </BackgroundLines>
    </main>
  );
}
