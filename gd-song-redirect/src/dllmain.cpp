#include "includes.h"

bool (__thiscall *CCHttpRequest_setUrl)(extension::CCHttpRequest *self, const char *url);
bool __fastcall CCHttpRequest_setUrl_H(extension::CCHttpRequest *self, void *, const char *url) { 
    // New string
    std::string relay = url;
    // Check if it's a boomlings url
    if(relay.length() >= 33 && relay == "http://www.boomlings.com/database/getGJSongInfo.php") {
      // Replace the boomlings part with whatever URL we want
      relay = "http://localhost:3000/gd-song-prx/getGJSongInfo.php";
    }
    CCHttpRequest_setUrl(self, relay.c_str());

    return true;
}
DWORD WINAPI thread_func(void* hModule) {
    MH_Initialize();
    auto base = reinterpret_cast<uintptr_t>(GetModuleHandle(0));
    MH_CreateHook(
            reinterpret_cast<void *>(GetProcAddress(GetModuleHandleA("libextensions.dll"), "?setUrl@CCHttpRequest@extension@cocos2d@@QAEXPBD@Z")),
            reinterpret_cast<void *>(&CCHttpRequest_setUrl_H),
            reinterpret_cast<void **>(&CCHttpRequest_setUrl)
    );
    MH_EnableHook(MH_ALL_HOOKS);

    return 0;
}
BOOL APIENTRY DllMain(HMODULE handle, DWORD reason, LPVOID reserved) {
    if (reason == DLL_PROCESS_ATTACH) {
        auto h = CreateThread(0, 0, thread_func, handle, 0, 0);
        if (h)
            CloseHandle(h);
        else
            return FALSE;
    }
    return TRUE;
}