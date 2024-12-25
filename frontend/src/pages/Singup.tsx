import Auth from "../components/Auth";
import { Quote } from "../components/Quout";





export default function Signup() {
    return  <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signup" />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
}