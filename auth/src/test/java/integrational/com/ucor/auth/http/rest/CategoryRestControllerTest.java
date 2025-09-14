package integrational.com.ucor.auth.http.rest;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.ucor.auth.AuthApplication;
import com.ucor.auth.service.CategoryService;

import integrational.IntegrationTestBase;
import lombok.extern.slf4j.Slf4j;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@ContextConfiguration(classes = AuthApplication.class)
@SpringBootTest
@Slf4j
public class CategoryRestControllerTest extends IntegrationTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Value("${admin.pass}")
    private String adminPass;

    @Autowired
    private CategoryService categoryService;

    @Test
    public void createCategoryTest() throws Exception {
        var res = mockMvc.perform(MockMvcRequestBuilders
            .post("/api/v1/auth/sign-in")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"username\": \"Admin\", \"password\": \"" + adminPass + "\"}")
        )
        .andExpect(status().isOk())
        .andReturn()
        .getResponse();

        mockMvc.perform(MockMvcRequestBuilders
            .post("/api/v1/categories")
            .contentType(MediaType.APPLICATION_JSON)
            .cookie(res.getCookies()[0])
            .content("{\"name\": \"svarshik\"}")
        )
        .andExpect(status().isCreated());

        log.info(categoryService.findByName("svarshik").toString());

    }

}
