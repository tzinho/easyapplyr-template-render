import Image from "next/image";

import { WaitlistForm } from "~/components/waitlist-form";
import { SocialLinks } from "~/components/social-links";
import { WaitlistAvatars } from "~/components/waitlist-avatars";
import { BackgroundLines } from "~/components/background-lines";

export default function Home() {
  return (
    <main className="relative flex h-full flex-col items-center justify-center bg-gradient-to-b from-primary to-[#331F0D] py-4">
      {/* // <main className="relative flex h-screen flex-1 flex-col items-center justify-center bg-red-100 py-4"> */}
      <BackgroundLines className="flex h-full w-full flex-col items-center justify-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />

        <div className="relative mx-auto flex h-full w-full max-w-2xl flex-col justify-center px-4 text-center">
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <Image
              src="/android-launchericon-144-144.png"
              width={72}
              height={72}
              alt="Logo Easyapplyr"
              className="rounded-full shadow-lg ring-2 ring-primary"
            />
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Junte-se a Easyapplyr <br />
              <span className="text-lg font-black md:text-xl">
                Faça parte da lista de espera
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
              Faça parte de algo verdadeiramente extraordinário. Junte -se a
              milhares de outras pessoas que já ganham acesso precoce ao nosso
              novo produto revolucionário.
            </p>
            <p className="text-md hidden text-gray-200 md:block">
              Estamos construindo a versão beta de um aplicativo que irá mudar a
              forma de criar currículos, com a ajuda te inteligência artificial
              você será capaz de otimizar suas chances de conseguir suas vagas
              dos sonhos. Precisamos de pessoas que nos ajudem a criar esse
              aplicativo, pra que ele realmente possa ajudar as pessoas a
              alcançar seus sonhos. Insira seu email e fique por dentro das
              novidades. Desde já agradecemos sua ajuda
            </p>

            <WaitlistForm />
            <WaitlistAvatars />
          </div>

          <SocialLinks />
        </div>
      </BackgroundLines>
    </main>
  );
}
