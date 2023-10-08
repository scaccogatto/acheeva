import {useNavigate} from "react-router-dom";
import {Button, CircularProgress} from "@mui/material";
import {loginWithGoogle} from "../services/service.js";
import {useEffect, useContext, Fragment} from "react";
import {AcheevaContext} from "../context/AcheevaContext.jsx";
import GoogleIcon from '@mui/icons-material/Google';
import styled from "@emotion/styled";
import Loading from "./Loading.jsx";

const App = () => {
    const {user, isUserLoading} = useContext(AcheevaContext);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        await loginWithGoogle();
    }

    useEffect(() => {
        if (user) {
            navigate("/welcome");
        }
    }, [user])


    return (<Fragment>
            {isUserLoading && !user?
                <Loading />
                :
            <div className="flex flex-col items-center justify-center mt-16 gap-10">
                <svg width="146" height="178" viewBox="0 0 146 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M53.0328 94.2953L43.597 119.823C42.055 123.996 37.966 126.601 33.6033 126.601C32.4286 126.601 31.2331 126.411 30.0584 126.012C24.5418 124.134 21.6553 118.32 23.6131 113.025L35.3567 81.2522C39.0784 87.7841 45.4405 92.6181 53.0328 94.2987V94.2953Z" fill="#184276"/>
                    <path opacity="0.5" d="M117.933 101.018L107.693 95.0888C102.474 92.0637 96.8019 89.943 90.9318 88.8029L83.8801 69.7269H84.8053C97.7444 69.7269 109.311 77.7766 113.809 89.9049L117.929 101.011V101.018H117.933Z" fill="white"/>
                    <path d="M115.937 126.012C114.766 126.411 113.57 126.601 112.395 126.601C108.033 126.601 103.944 123.999 102.402 119.824L93.9188 96.8769C97.4672 97.9269 100.891 99.3961 104.117 101.264L121.831 111.524L122.386 113.021C124.347 118.316 121.457 124.131 115.937 126.009V126.012Z" fill="#184276"/>
                    <path opacity="0.24" d="M58.9063 87.7946H55.2159L55.3233 87.4724C55.3961 87.4862 55.4654 87.4966 55.5416 87.5105C56.6332 87.6976 57.7628 87.7911 58.9098 87.7911L58.9063 87.7946Z" fill="white"/>
                    <path d="M106.182 69.1899C99.9899 64.9866 92.5743 62.5817 84.8018 62.5817H81.2361L76.8006 50.5851L72.9958 40.29L82.6846 14.0757C84.6459 8.78082 81.7559 2.96273 76.2393 1.08458C75.1685 0.720735 74.077 0.530148 72.9958 0.498961C77.4694 0.377678 81.7109 3.00431 83.2875 7.27345L88.0487 20.1502L106.175 69.1933L106.182 69.1899Z" fill="#4EB1EA"/>
                    <path d="M117.933 101.018L107.693 95.0888C102.474 92.0637 96.8019 89.943 90.9318 88.803C87.5324 88.1376 84.0638 87.798 80.5708 87.798H58.9098C57.7628 87.798 56.6366 87.701 55.5416 87.5174C55.4654 87.5035 55.3961 87.4931 55.3233 87.4792C46.9998 85.9684 40.4749 79.2909 39.1858 70.8947L45.9048 52.7197L62.7042 7.27689C64.2809 3.01121 69.0213 -0.117874 73.4983 0.00340795C74.576 0.0345949 75.6676 0.225182 76.7418 0.58903C82.2584 2.46718 85.1449 8.28526 83.1871 13.5801L72.9993 40.2934L69.1426 50.7237L62.1151 69.727H84.8053C97.7444 69.727 109.311 77.7766 113.809 89.9049L117.929 101.011V101.018H117.933Z" fill="#804FD0"/>
                    <path d="M8.136 168.142C5.976 168.142 4.224 167.626 2.88 166.594C1.56 165.538 0.9 164.074 0.9 162.202C0.9 160.258 1.536 158.77 2.808 157.738C4.104 156.682 5.952 156.154 8.352 156.154C9.288 156.154 10.224 156.262 11.16 156.478C12.096 156.67 12.9 156.934 13.572 157.27V156.91C13.572 155.062 12.06 154.138 9.036 154.138C6.924 154.138 4.992 154.546 3.24 155.362V151.006C4.008 150.646 5.016 150.358 6.264 150.142C7.512 149.902 8.808 149.782 10.152 149.782C13.368 149.782 15.792 150.43 17.424 151.726C19.08 152.998 19.908 154.786 19.908 157.09V167.602H13.968V166.126C13.32 166.75 12.504 167.242 11.52 167.602C10.536 167.962 9.408 168.142 8.136 168.142ZM10.008 164.254C10.752 164.254 11.448 164.11 12.096 163.822C12.744 163.51 13.236 163.114 13.572 162.634V161.122C12.54 160.426 11.364 160.078 10.044 160.078C9.204 160.078 8.556 160.258 8.1 160.618C7.644 160.978 7.416 161.506 7.416 162.202C7.416 162.85 7.632 163.354 8.064 163.714C8.52 164.074 9.168 164.254 10.008 164.254ZM31.8327 168.142C28.6647 168.142 26.1567 167.35 24.3087 165.766C22.4607 164.182 21.5367 161.926 21.5367 158.998C21.5367 156.07 22.4607 153.802 24.3087 152.194C26.1807 150.586 28.7007 149.782 31.8687 149.782C33.2847 149.782 34.6047 149.926 35.8287 150.214C37.0767 150.478 38.1087 150.862 38.9247 151.366V156.298C37.4607 155.242 35.5287 154.714 33.1287 154.714C31.5927 154.714 30.3567 155.074 29.4207 155.794C28.5087 156.49 28.0527 157.558 28.0527 158.998C28.0527 160.462 28.5087 161.542 29.4207 162.238C30.3327 162.91 31.5567 163.246 33.0927 163.246C35.4207 163.246 37.4367 162.694 39.1407 161.59V166.486C37.3167 167.59 34.8807 168.142 31.8327 168.142ZM41.663 140.998H47.999V152.086C48.767 151.318 49.643 150.742 50.627 150.358C51.635 149.974 52.691 149.782 53.795 149.782C56.219 149.782 58.007 150.418 59.159 151.69C60.335 152.938 60.923 154.642 60.923 156.802V167.602H54.587V157.63C54.587 155.686 53.699 154.714 51.923 154.714C51.107 154.714 50.363 154.906 49.691 155.29C49.019 155.65 48.455 156.214 47.999 156.982V167.602H41.663V140.998ZM74.1392 168.142C70.7552 168.142 68.0912 167.35 66.1472 165.766C64.2272 164.182 63.2672 161.938 63.2672 159.034C63.2672 156.178 64.1192 153.922 65.8232 152.266C67.5512 150.61 70.0352 149.782 73.2752 149.782C75.3392 149.782 77.1032 150.178 78.5672 150.97C80.0552 151.738 81.1712 152.806 81.9152 154.174C82.6832 155.518 83.0672 157.042 83.0672 158.746V161.086H69.2792C69.5192 162.046 70.1192 162.742 71.0792 163.174C72.0392 163.606 73.3472 163.822 75.0032 163.822C76.1312 163.822 77.2832 163.726 78.4592 163.534C79.6592 163.342 80.6912 163.078 81.5552 162.742V166.918C80.6672 167.278 79.5512 167.566 78.2072 167.782C76.8872 168.022 75.5312 168.142 74.1392 168.142ZM77.0912 157.126C76.9952 156.19 76.6112 155.458 75.9392 154.93C75.2672 154.402 74.3432 154.138 73.1672 154.138C72.0152 154.138 71.1032 154.414 70.4312 154.966C69.7592 155.494 69.3752 156.214 69.2792 157.126H77.0912ZM95.7251 168.142C92.3411 168.142 89.6771 167.35 87.7331 165.766C85.8131 164.182 84.8531 161.938 84.8531 159.034C84.8531 156.178 85.7051 153.922 87.4091 152.266C89.1371 150.61 91.6211 149.782 94.8611 149.782C96.9251 149.782 98.6891 150.178 100.153 150.97C101.641 151.738 102.757 152.806 103.501 154.174C104.269 155.518 104.653 157.042 104.653 158.746V161.086H90.8651C91.1051 162.046 91.7051 162.742 92.6651 163.174C93.6251 163.606 94.9331 163.822 96.5891 163.822C97.7171 163.822 98.8691 163.726 100.045 163.534C101.245 163.342 102.277 163.078 103.141 162.742V166.918C102.253 167.278 101.137 167.566 99.7931 167.782C98.4731 168.022 97.1171 168.142 95.7251 168.142ZM98.6771 157.126C98.5811 156.19 98.1971 155.458 97.5251 154.93C96.8531 154.402 95.9291 154.138 94.7531 154.138C93.6011 154.138 92.6891 154.414 92.0171 154.966C91.3451 155.494 90.9611 156.214 90.8651 157.126H98.6771ZM104.47 150.322H110.806L114.73 160.366L118.618 150.322H124.954L117.718 167.602H111.706L104.47 150.322ZM132.378 168.142C130.218 168.142 128.466 167.626 127.122 166.594C125.802 165.538 125.142 164.074 125.142 162.202C125.142 160.258 125.778 158.77 127.05 157.738C128.346 156.682 130.194 156.154 132.594 156.154C133.53 156.154 134.466 156.262 135.402 156.478C136.338 156.67 137.142 156.934 137.814 157.27V156.91C137.814 155.062 136.302 154.138 133.278 154.138C131.166 154.138 129.234 154.546 127.482 155.362V151.006C128.25 150.646 129.258 150.358 130.506 150.142C131.754 149.902 133.05 149.782 134.394 149.782C137.61 149.782 140.034 150.43 141.666 151.726C143.322 152.998 144.15 154.786 144.15 157.09V167.602H138.21V166.126C137.562 166.75 136.746 167.242 135.762 167.602C134.778 167.962 133.65 168.142 132.378 168.142ZM134.25 164.254C134.994 164.254 135.69 164.11 136.338 163.822C136.986 163.51 137.478 163.114 137.814 162.634V161.122C136.782 160.426 135.606 160.078 134.286 160.078C133.446 160.078 132.798 160.258 132.342 160.618C131.886 160.978 131.658 161.506 131.658 162.202C131.658 162.85 131.874 163.354 132.306 163.714C132.762 164.074 133.41 164.254 134.25 164.254Z" fill="#184276"/>
                </svg>
                <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">ENTRA</h1>
                        <p className="text-sm w-40">Accedi ad Acheeva con un account Google</p>
                    </div>
                    <div>
                        <MyButton startIcon={<GoogleIcon/>} variant="contained" onClick={handleGoogleLogin} className="w-fit"
                                sx={{}}>
                            Accedi con google
                        </MyButton>
                    </div>
                </div>}
        </Fragment>
    );
}

export default App

export const MyButton = styled(Button)`
  border-radius: 50px;
  font-size: 12px ; 
  font-family: 'Prompt', sans-serif;
  width: fit-content;
  text-transform: lowercase;
  text-transform: capitalize;
  
`
