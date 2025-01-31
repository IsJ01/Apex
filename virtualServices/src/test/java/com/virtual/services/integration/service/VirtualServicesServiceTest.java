package com.virtual.services.integration.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Commit;

import com.virtual.services.dto.FieldCreateEditDto;
import com.virtual.services.dto.RowCreateEditDto;
import com.virtual.services.dto.VirtualServiceCreateEditDto;
import com.virtual.services.integration.IntegrationTestBase;
import com.virtual.services.service.FieldService;
import com.virtual.services.service.RowService;
import com.virtual.services.service.VirtualServicesService;

public class VirtualServicesServiceTest extends IntegrationTestBase {

    @Autowired
    private VirtualServicesService virtualServicesService;

    @Autowired
    private RowService rowService;

    @Autowired
    private FieldService fieldService;

    @Test
    @Commit
    public void testCreate() {
        var serviceDto = new VirtualServiceCreateEditDto("service1");
        var service = virtualServicesService.create(serviceDto);

        var rowDto = new RowCreateEditDto("row1", service.getId());
        var row = rowService.create(rowDto);

        var fieldDto = new FieldCreateEditDto("field1", "value1", row.getId());
        var field = fieldService.create(fieldDto);

        assertEquals(field.getRowId(), Long.valueOf(1L));

    }

    @Test
    @Commit
    public void testUpdate() {
        var serviceDto = new VirtualServiceCreateEditDto("service2");
        var serviceEDto = new VirtualServiceCreateEditDto("service3");
        var serviceDto1 = virtualServicesService.create(serviceDto);
        var serviceDto2 = virtualServicesService.update(serviceDto1.getId(), serviceEDto);

        assertEquals(serviceDto2.get().getName(), "service3");

        var rowDto = new RowCreateEditDto("row2", serviceDto2.get().getId());
        var rowEDto = new RowCreateEditDto("row3", serviceDto2.get().getId());
        var rowDto1 = rowService.create(rowDto);
        var rowDto2 = rowService.update(rowDto1.getId(), rowEDto);

        assertEquals(rowDto2.get().getName(), "row3");

        assertEquals(virtualServicesService.findByName("service3")
            .get()
            .getRows()
            .get(0).getName(), "row3");
    }

    @Test
    @Commit
    public void testDelete() {
        var serviceDto = new VirtualServiceCreateEditDto("service4");
        var service = virtualServicesService.create(serviceDto);

        var rowDto = new RowCreateEditDto("row4", service.getId());
        var row = rowService.create(rowDto);

        var fieldDto = new FieldCreateEditDto("field4", "value4", row.getId());
        var field = fieldService.create(fieldDto);

        virtualServicesService.delete(service.getId());

        assertTrue(fieldService.findById(field.getRowId()).isEmpty());
    }


}
