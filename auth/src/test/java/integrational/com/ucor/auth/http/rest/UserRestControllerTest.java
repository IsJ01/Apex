package integrational.com.ucor.auth.http.rest;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.ucor.auth.AuthApplication;

import integrational.IntegrationTestBase;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@ContextConfiguration(classes = AuthApplication.class)
@SpringBootTest
public class UserRestControllerTest extends IntegrationTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testFindAllByFilter() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
            .get("/api/v1/public/users?size=10&page=1")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"username\": \"user\"}")
        )
        .andExpect(status().isOk());
    }

}
