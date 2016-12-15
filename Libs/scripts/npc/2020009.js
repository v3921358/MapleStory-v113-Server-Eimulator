/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
importPackage(Packages.client);
importPackage(Packages.server.quest);

var status = 0;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.sendOk("�Э��s���.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getPlayer().getJob() <= 200 || cm.getPlayer().getJob() >= 300 || cm.getPlayer().getJob() % 10 != 0) {
                cm.sendOk("#rOdin#k�P�A�P�b!");
                cm.dispose();
                return;
            }
            if (cm.getQuestStatus(100102) == 2 ) { //����
                cm.sendNext("#rBy Odin's ring!#k �A�{�b�i�H�ܱo��j.");
            } else if (cm.getQuestStatus(100102) == 1 ) { //�}�l
                cm.sendOk("�b�B�쳷�줺���#r����t�a#k�A�B�o�{�̭������t���Y");
                cm.dispose();
            } else if (cm.getQuestStatus(100101) == 2) { //����
                cm.sendNext("#rBy Odin's raven!#k �A�T����u�q");
            } else if (cm.getQuestStatus(100100) == 1 ) { // �}�l
                cm.sendOk("�{�b�A�^�h��#b�~��#k. �L�|���U�A.");
                cm.dispose();
            } else if (cm.getPlayer().getJob() <300 && cm.getPlayer().getJob() > 200 && cm.getPlayer().getJob() % 10 == 0 && cm.getPlayer().getLevel() >= 70) {
                cm.sendNext("#rBy Odin's beard!#k�A�ܱj��.");
            } else {
                cm.sendOk("�٤��O�ɭ�...");
                cm.dispose();
            }
        } else if (status == 1) {
			if(cm.getPlayer().getJob() % 10 != 0){
				cm.dispose();
			}
            if (cm.getQuestStatus(100102) == 2 ) { //����
                cm.changeJob(cm.getPlayer().getJob() + 1);
                cm.sendOk("�A�ܱo��[�j�j�F!");
                cm.dispose();
            } else if (cm.getQuestStatus(100101) == 2) { //����
				if(cm.haveItem(4031057)){
					cm.sendAcceptDecline("�T�w�n�n���̲״���F?");
				}else{
					cm.sendOk("�A�S��#b�O�q����#k");
					cm.dispose();
				}
            } else {
                cm.sendAcceptDecline("���O���٥i�H���A��j�A�A�Q�n�����D�Զ�?");
            }
        } else if (status == 2) {
            if (cm.getQuestStatus(100101) == 2) { //����
				if(cm.haveItem(4031057)){
					cm.startQuest(100102);
					cm.gainItme(4031057,-1);
					cm.sendOk("�o�{#r����t�a#k���ê������t���Y�åB�a�^#b���z����#k");
					cm.dispose();
				}else{
					cm.sendOk("�A�S��#b���z����#k");
					cm.dispose();
				}
            } else {
                cm.startQuest(100100);
                cm.sendOk("�^�h��#b�~��#k.�L�|���U�A.");
                cm.dispose();
            }
        }
    }
}	