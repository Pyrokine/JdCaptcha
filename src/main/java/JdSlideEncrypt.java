import org.apache.commons.lang3.StringUtils;

import javax.script.*;
import java.io.InputStreamReader;
import java.util.Objects;

/**
 * @Author: cyz
 * @Date: 2018/11/28 0028 下午 15:59
 * @Version 1.0
 */

public class JdSlideEncrypt {

    private static ScriptEngine engine;

    static {
        try {
            ScriptEngineManager manager = new ScriptEngineManager();
            engine = manager.getEngineByName("nashorn");
            Bindings engineScope = engine.getBindings(ScriptContext.ENGINE_SCOPE);
            engineScope.put("window", engineScope);
            engineScope.put("navigator", engineScope);
            InputStreamReader jsEncryptFileReader = new InputStreamReader(Objects.requireNonNull(JdSlideEncrypt.class.getClassLoader().getResourceAsStream("js/Slide.js")));
            engine.eval(jsEncryptFileReader);
            jsEncryptFileReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String encrypt(String x) {
        if (StringUtils.isEmpty(x)) {
            return null;
        }
        try {
            Invocable invoke = (Invocable) engine;
            return (String) invoke.invokeFunction("getTrace", x);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static void main(String[] args) throws Exception {
//        String result = JdPasswordEncrypt.encrypt("123456", null);
        String result = JdSlideEncrypt.encrypt("93");
        System.out.println(result);
    }
}
